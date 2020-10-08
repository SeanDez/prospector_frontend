import React, { useState, useEffect } from 'react';

import buildIntroSentence from './helperFunctions/buildIntroSentence';
import Form from './Form';
import splitRawInputIntoDerivedState from './helperFunctions/splitRawInputIntoDerivedState';
import ValuePreviews from './ValuePreviews';
import Submitter from './Submission/Submitter';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Alert from '@material-ui/lab/Alert';

/*
  Set a flash message for an error or message
  Remove message after 5 secconds
  If another flash message comes in, overwrite the previous flash message. Reset the timer
*/
function displayFlashMesage(flashMessage: Partial<{ errors: string, message: string }>, setFlashMessage: Function, secondsVisible: number) {
  if ('errors' in flashMessage) {
    return <Snackbar />
  } else { // message key is present
    return <Snackbar />
  }
}

type FlashMessages = Partial<{ message?: string, errors?: string }>;

export default (props: any) => {
  const [rawInputString, setRawInputString] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [employeeRoleCode, setEmployeeRoleCode] = useState('');
  const [email, setEmail] = useState('')
  const [contactStrategy, setContactStrategy] = useState('');
  const [customContactChannel, setCustomContactChannel] = useState('');

  const [introSentenceBody, setIntroSentenceBody] = useState('');
  const [introSentencePrefix, setIntroSentencePrefix] = useState('');
  const [introSentenceSuffix, setIntroSentenceSuffix] = useState('');

  const [completeIntroSentence, setCompleteIntroSentence] = useState('');

  // update derived state whenever there is a change to raw input
  useEffect(() => {
    splitRawInputIntoDerivedState(rawInputString, setFirstName, setLastName, setCompanyName, setEmployeeRoleCode, setEmail, setIntroSentenceBody, setContactStrategy, setCustomContactChannel);
  }, [rawInputString])

  // update complete sentence on state changes
  useEffect(() => {
    const newFullIntro = buildIntroSentence(introSentencePrefix, introSentenceBody, introSentenceSuffix);
    setCompleteIntroSentence(newFullIntro);
  }, [introSentencePrefix, introSentenceBody, introSentenceSuffix]);

  // update contact strategy on state change
  useEffect(() => {

  }, [contactStrategy]);

  const [flashMessage, setFlashMessage] = useState<FlashMessages>({});

  return (
    <div>
      <ValuePreviews
        firstName={firstName}
        lastName={lastName}
        companyName={companyName}
        employeeRoleCode={employeeRoleCode}
        email={email}
        completeIntroSentence={completeIntroSentence}
        contactStrategy={contactStrategy}
        customContactChannel={customContactChannel}
      />
      <Form
        setRawInputString={setRawInputString}
        firstName={firstName}
        lastName={lastName}
        companyName={companyName}
        employeeRoleCode={employeeRoleCode}
        email={email}
        completeIntroSentence={completeIntroSentence}
        contactStrategy={contactStrategy}
        customContactChannel={customContactChannel}
        setFlashMessage={setFlashMessage}
      />
      <Snackbar
        open={Object.keys(flashMessage).length > 0}
        autoHideDuration={3 * 1000}
        onClose={() => setFlashMessage({}) }
      >
        <div>
          { 'errors' in flashMessage && 
            <Alert 
              severity="error"
              elevation={6}
              variant="filled"  
            >{flashMessage.errors}</Alert>
          } { 'message' in flashMessage && 
            // skipping the ternary prevents a success blip on error 
            <Alert 
              severity="success"
              elevation={6}
              variant="filled"  
            >{flashMessage.message}</Alert>
          }
        </div>
      </Snackbar>
    </div>
  )
}

