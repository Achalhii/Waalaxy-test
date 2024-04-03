import React, { useEffect, useState } from 'react';
import QueueFIFO from './components/QueueFIFO';
import ActionForm from './components/ActionForm';
import { Timer } from './components/Timer';
import styled from 'styled-components';
import { ActionsProps } from './components/Action';

const AppContainer = styled.div`
  background: antiquewhite;
  display: flex;
  flex-direction: column;
  height: 100vh
`
const Title = styled.h1`
  text-align: center;
  padding: 10px;
`

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
`
const Content = styled.div`
  width: 100%;
  display: flex;
  height: 85vh;
  border-top: 1px solid rgba(82, 81, 81, 0.55);
  padding-top: 20px;
`;

const Panel = styled.div`
  border-right: 1px solid rgba(82, 81, 81, 0.55);
  display: flex;
  justify-content: center;
  width: 50%;
  flex-grow: 1;
  overflow-y: scroll;
`;

const SecondPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

function App(){
  const [queueContent, setQueueContent] = useState<string[]>([]);
  const [actions, setActions] = useState<ActionsProps[]>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [timers, setTimers] = useState({
    timer1: 0,
    timer2: Date.now()
  });

  useEffect(() => {
    setSocket(new WebSocket(process.env.REACT_APP_WS_URL as string));
  }, []);

  if(socket) {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'start':
          setActions(data.actions);
          break;
        case 'actionConsumed':
          consumeAction(data.actionName);
          fetchQueue()
          break;
        case 'refreshQueue':
          fetchQueue();
          break;
        case 'resetCredits':
          setActions(data.actions);
          setTimers({ timer1: timers.timer1, timer2: Date.now() });
          break;
        default:
          break;
      }
    };
    socket.onerror = () => {
      alert('Impossible de se connecter au serveur');
    }
  }

  const fetchQueue = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/queue');
    const formattedResponse = await response.json();
    if (Array.isArray(formattedResponse?.queue)) {
      setQueueContent(formattedResponse.queue);
      }
  };

  const consumeAction = (actionName: string) => {
    const newActions = actions.map((action : ActionsProps) => {
      if(action.name === actionName){
        action.creditAvailable -= 1;
      }
      return action;
    });
    setActions(newActions);
    setTimers({ timer1: Date.now(), timer2: timers.timer2 });
  }

  return (
    <AppContainer>
      <Title>Test Waalaxy</Title>
      <TimerContainer>
        <Timer deadline={15} timeToStart={timers.timer1} title={"Temps restant avant l'execution de la prochaine action"}/>
        <Timer deadline={15*60} timeToStart={timers.timer2}  title={"Temps restant avant la recuperation de vos credits"} />
      </TimerContainer>
      <Content>
        <Panel>
          <QueueFIFO queueContent={queueContent}/>
        </Panel>
        <SecondPanel>
          <ActionForm actions={actions}/>
        </SecondPanel>
      </Content>
    </AppContainer>
  );
}

export default App;
