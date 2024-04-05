import styled from 'styled-components';
import { useState } from 'react';
import Action from './Action';

const Span = styled.span`
  font-size: 20px;
  justify-content: center;
`;

const Main = styled.div`
  justify-content: start;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const AddButton = styled.button`
  border: none;
  height: 50px;
  padding: 22px 40px 22px 40px;
  border-radius: 12px;
  background-color: #86cdf0;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: white;

  background-image: linear-gradient(302deg,rgb(38,211,185) 0%,rgb(84,193,246) 28%,rgb(49,90,231) 77%,rgb(62,51,237) 100%) !important
`;

type Props = {
  actions: {
    name: string;
    creditAvailable: number;
    maxCredits: number;
  }[];
};

const ActionForm = ({ actions }: Props) => {
  const [nameOfActionSelected, setNameOfActionSelected] = useState('');

  const addToQueue = async () => {
    await fetch(process.env.REACT_APP_API_URL + '/add-to-queue', {
      method: 'POST',
      body: JSON.stringify({ name: nameOfActionSelected }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <Main>
      <Span>Ajouter une action</Span>
      <ActionContainer>
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <div key={index} onClick={() => {setNameOfActionSelected(action.name)}}>
                <Action checked={nameOfActionSelected === action.name} {...action} />
            </div>
          ))
        ) : (
          <span>Pas d'action disponible</span>
        )}
      </ActionContainer>
      <div>
        <AddButton
          onClick={addToQueue}
        >
          Ajouter
        </AddButton>
      </div>
    </Main>
  );
};

export default ActionForm;
