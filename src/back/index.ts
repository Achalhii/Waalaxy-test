import express, {Request, Response} from 'express';
import cors from 'cors';
import { Action } from '~~/classes/Action';
import { FifoActionScheduler } from '~~/classes/FifoActionScheduler';
import WebSocket from 'ws';
import * as http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

app.use(express.json());
app.use(cors());


const fifoActionScheduler = new FifoActionScheduler([
  new Action('A',10),
  new Action('B',10),
  new Action('C',15)
], 15000);

wss.on('connection', ws => {
  console.info('new Client connected')

  ws.send(JSON.stringify({
    type: 'start',
    actions: generateActionWithRandomCredits(fifoActionScheduler.getActionsAvailableJSON()),
  }));

  fifoActionScheduler.events.on('actionConsumed', (actionName: string) => {
    ws.send(JSON.stringify({ type: 'actionConsumed', actionName }));
  });

  fifoActionScheduler.events.on('addAction', () => {
    ws.send(JSON.stringify({ type: 'refreshQueue' }));
  });

  setInterval(() => {
    ws.send(JSON.stringify({
      type: 'resetCredits',
      actions: generateActionWithRandomCredits(fifoActionScheduler.getActionsAvailableJSON())
    }));
  }, 15*60*1000 // 15 minutes
  );
});

app.post('/add-to-queue', (req: Request, res: Response) => {
    const actionName = req.body.name;
    if (typeof actionName !== 'string') {
        return res.status(402).send('Bad Request');
    }
    try{
      const action = fifoActionScheduler.getActionsByName(actionName);
      fifoActionScheduler.addAction(action);
      return res.send();
    } catch (e) {
      return res.status(404).send('Action not found');
    }

});

app.get('/queue', (req: Request, res: Response) => {
    return res.json({
        queue: fifoActionScheduler.queue.getQueue()
    });
});


function generateActionWithRandomCredits(actions: Array<Action>) {
  return actions.map(action => {
    return { ...action, creditAvailable: Math.round((Math.random() * 0.2 + 0.8) * action.maxCredits)};
  });
}
server.listen(process.env.PORT);

console.info(`Server started on port ${process.env.PORT}`);
