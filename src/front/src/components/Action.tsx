import styled from 'styled-components';

type InputProps = {
  checked: boolean;
};

const Content = styled.div<InputProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  border: 2px solid ${props => (props.checked ? 'rgb(49,90,231)' : '#f1f1f1')};
  cursor: pointer;
  flex-direction: column;
  gap: 10px;

  &:hover {
    border-color: #86cdf0;
  }
`;

const MaxCredit = styled.span`
  font-weight: 700;
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
      <span>Action: {name}</span>
      <br />
      <span>
        {creditAvailable}/ <MaxCredit>{maxCredits}</MaxCredit>
      </span>
    </Content>
  );
};

export default Action;
