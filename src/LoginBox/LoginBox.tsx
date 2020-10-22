import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';
import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';

const { REACT_APP_SERVER_URL } = process.env;

enum SnackbarStatuses { success, issue, blank }

function detectMessageState(message: string, setSnackbarState: Function) {
  const successPattern = /(^success|^logged)/i;
  const failPattern = /(^error|^invalid)/i;

  const successful = successPattern.test(message);
  const issue = failPattern.test(message);

  successful && setSnackbarState(SnackbarStatuses.success);
  issue && setSnackbarState(SnackbarStatuses.issue);
}

function clearSnackbarStates(setMessageState: Function, setStatus: Function) {
  setMessageState('');
  setStatus(SnackbarStatuses.blank);
}

async function logIn(event: any, userName: string, password: string, setLoggedIn: Function, setSnackbarMessage: Function) {
  event.preventDefault();

  const loginUrl = buildUrl(REACT_APP_SERVER_URL!, {
    path: '/login',
  });

  const encodedUserPassword = Buffer.from(`${userName}:${password}`).toString('base64');

  try {
    const response = await fetch(loginUrl, {
      method: 'post',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        'authorization': `Basic ${encodedUserPassword}`,
      }
    });

    if (response.status === 204) {
      setLoggedIn(true);
      setSnackbarMessage("Success, you have logged in.");
      return;
    }

    setSnackbarMessage(`Invalid username, password, or both.`);
  } catch (error) {
    throw new Error(error);
  }
}

interface PropsShape {
  setIsLoggedIn: Function;
}

export default ({ setIsLoggedIn }: PropsShape) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState<SnackbarStatuses>(SnackbarStatuses.blank);

  return (
    <div>
      <BoxContainer>
        <h4>Log In</h4>
        <FormContainer>
          <InputAndLabel>
            <label>Username</label>
            <input type='text' onChange={(e) => setUserName(e.target.value)} />
          </InputAndLabel>
          <InputAndLabel>            
            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
          </InputAndLabel>
          <button
            onClick={(e: any) => {
              logIn(e, userName, password, setIsLoggedIn, setSnackbarMessage);
            }}
          >
            Submit
          </button>
        </FormContainer>
      </BoxContainer>
    </div>
  )
}

const BoxContainer = styled.div`
  position: absolute;
  border: 2px dashed yellow;
  margin: auto;
  width: 350px;
  height: 200px;
  top: 0; right: 0;
  bottom: 0; left: 0;
`;

const FormContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
`;

const InputAndLabel = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2vh;
`;
