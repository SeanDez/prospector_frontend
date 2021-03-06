import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import buildIntroSentence from './helperFunctions/buildIntroSentence';
import CustomPropertyManager from '../InitialLoad/CustomPropertyManager';
import Form from './Form';
import splitRawInputIntoDerivedState from './helperFunctions/splitRawInputIntoDerivedState';
import ValuePreviews from './ValuePreviews';
import Instructions from './Instructions';

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

  const [flashMessage, setFlashMessage] = useState('');


  // verify or add custom properties
  useEffect(() => {
    async function wrapper() {
      const customPropertyManager = new CustomPropertyManager();
      const result: object[] | null = await customPropertyManager.verifyOrAddCustomProperties();
      console.log('result of customPropertyManager.verifyOrAddCustomProperties', result);
    }

    wrapper();
  }, []);

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
      <Instructions />

      <Snackbar
        open={Boolean(flashMessage)}
        autoHideDuration={3 * 1000}
        onClose={() => setFlashMessage('') }
      >
        <div>
          { flashMessage && 
            <Alert 
              elevation={6}
              variant="filled"  
            >
              {flashMessage}
            </Alert>
          }
        </div>
      </Snackbar>
    </div>
  )
}

