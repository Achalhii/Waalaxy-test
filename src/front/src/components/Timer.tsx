import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  display: inline-block;
  padding: 5px;
  text-align: center;
  width: 200px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Col = styled.div`
  width: 50%;
  float: left;
`;

const Box = styled.div`
  font-weight: 500;
  padding: 5px;
`;
type Props = {
  deadline: number;
  timeToStart: number;
  title: string;
};
export const Timer = ({ deadline, timeToStart, title }: Props) => {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const currentTime = timeToStart;

  const convertTimeValue = (time: number) => {
    return time < 0 ? '--' : time;
  };

  React.useEffect(() => {
    const getTime = (deadline: number) => {
      const time = currentTime + deadline * 1000 - Date.now();
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, [deadline, currentTime]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{title}</h3>
      <Container role="timer">
        <Col>
          <Box>
            <p id="minute">{convertTimeValue(minutes)}</p>
            <span className="text">Minutes</span>
          </Box>
        </Col>
        <Col>
          <Box>
            <p id="second">{convertTimeValue(seconds)}</p>
            <span>Secondes</span>
          </Box>
        </Col>
      </Container>
    </div>
  );
};
