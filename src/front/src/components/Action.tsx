import styled from 'styled-components';

type InputProps = {
  checked: boolean;
};
const Content = styled.div<InputProps>`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 3px;
  border: 3px solid ${props => (props.checked ? '#000000' : '#f1f1f1')};

  h1 {
    font-size: 20px;
    margin-top: 10px;
  }

  h2 {
    font-size: 15px;
    display: inline-flex;
    p {
      font-size: 10px;
      color: #868686;
    }
  }
`;

export type ActionsProps = {
  name: string;
  creditAvailable: number;
  maxCredits: number;
  checked: boolean;
};
const Action = ({ name, creditAvailable, maxCredits, checked }: ActionsProps) => {
  return (
    <Content checked={checked}>
      <h1>{name}</h1>
      <h2>
        {creditAvailable}
        <p>/{maxCredits}</p>
      </h2>
    </Content>
  );
};

export default Action;
