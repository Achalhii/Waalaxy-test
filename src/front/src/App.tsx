import React, { useEffect, useState } from 'react';
import QueueFIFO from './components/QueueFIFO';
import ActionForm from './components/ActionForm';
import { Timer } from './components/Timer';
import styled, { createGlobalStyle } from 'styled-components';
import { ActionsProps } from './components/Action';

const GlobalStyle = createGlobalStyle`
  body {
    background: #d8efff;
  }

  * {
    font-family: Poppins, sans-serif;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
`;

const WalaxyLogo = styled.img`
  width: 100px;
`;

interface PanelProps {
  border: boolean;
}

const Panel = styled.div<PanelProps>`
  display: flex;
  justify-content: center;
  flex: 1;

  ${props =>
    props?.border &&
    `
    border-right: 1px solid gray;
  `}
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid rgba(82, 81, 81, 0.55);
  padding-top: 20px;
`;

function App() {
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

  if (socket) {
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'start':
          setActions(data.actions);
          fetchQueue();
          break;
        case 'actionConsumed':
          consumeAction(data.actionName);
          fetchQueue();
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
    };
  }

  const fetchQueue = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/queue');
    const formattedResponse = await response.json();
    if (Array.isArray(formattedResponse?.queue)) {
      setQueueContent(formattedResponse.queue);
    }
  };

  const consumeAction = (actionName: string) => {
    const newActions = actions.map((action: ActionsProps) => {
      if (action.name === actionName) {
        action.creditAvailable -= 1;
      }
      return action;
    });
    setActions(newActions);
    setTimers({ timer1: Date.now(), timer2: timers.timer2 });
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>
          Test <WalaxyLogo src="https://www.waalaxy.com/wp-content/uploads/2021/10/Wlx-logo-2.0-NAMEALIEN-Blue.png"></WalaxyLogo>
        </Title>
        <TimerContainer>
          <Timer deadline={15} timeToStart={timers.timer1} title={"Temps restant avant l'execution de la prochaine action"} />
          <Timer deadline={15 * 60} timeToStart={timers.timer2} title={'Temps restant avant la recuperation de vos credits'} />
        </TimerContainer>
        <Content>
          <Panel border>
            <QueueFIFO queueContent={queueContent} />
          </Panel>
          <Panel border={false}>
            <ActionForm actions={actions} />
          </Panel>
        </Content>
      </AppContainer>
    </>
  );
}

export default App;
