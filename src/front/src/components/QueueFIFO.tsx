import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const QueueText = styled.span`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 20px;
`;

const QueueAction = styled.span<{ last: boolean; first: boolean }>`
  border: 1px #86cdf0 solid;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  ${props => (props.last ? 'border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;' : '')}
  ${props => (props.first ? 'border-top-left-radius: 8px; border-top-right-radius: 8px;' : '')}
`;

type Props = {
  queueContent: string[];
};

const QueueFIFO = ({ queueContent }: Props) => {
  return (
    <Content>
      {queueContent.length > 0 ? (
        <>
          <QueueText>First-Out</QueueText>
          {queueContent.map((action, index) => (
            <QueueAction key={index} last={queueContent.length - 1 === index} first={index === 0}>
              {action}
            </QueueAction>
          ))}
          <QueueText>Last-Out</QueueText>
        </>
      ) : (
        <span>Vide</span>
      )}
    </Content>
  );
};

export default QueueFIFO;
