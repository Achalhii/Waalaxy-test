import styled from 'styled-components';
import React from 'react';
import Action from './Action';

const ActionContainer = styled.div`
  display: inline-block;
  margin: 50px;
`;

const Span = styled.span`
  font-size: 20px;
  justify-content: center;
`;
const ActionInput = styled.input`
 display: none;
`;

type Props = {
  actions: {
    name :string,
    creditAvailable: number,
    maxCredits: number
  }[]
}
const ActionForm = ({ actions }: Props) => {
  const [nameOfActionSelected, setNameOfActionSelected] = React.useState('');
  return (
    <div style={{textAlign:'center'}}>
      <Span>Ajouter une action</Span>
      <br/>
      {actions.length > 0 ? (
        actions.map((action, index) => (
          <ActionContainer key={index}>
            <label htmlFor={action.name}>
              <Action
                checked={nameOfActionSelected === action.name}
                {...action}
              />
            </label>
            <ActionInput id={action.name} name='actionToChoose' type="radio" value={action.name} onInput={
              (e) => {
                setNameOfActionSelected(e.currentTarget.value);
              }
            }/>
          </ActionContainer>
        ))
      ) : <span>Pas d'action disponible</span>}
      <div>
        <button type="submit" onClick={async () => {
          await fetch(process.env.REACT_APP_API_URL + '/add-to-queue', {
            method: 'POST',
            body: JSON.stringify({ name: nameOfActionSelected }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }}>Ajouter</button>
      </div>
    </div>
  );
};

export default ActionForm;
