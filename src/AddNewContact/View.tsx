import React, { useState, useEffect } from 'react';

import buildIntroSentence from './helperFunctions/buildIntroSentence';
import Form from './Form';
import splitRawInputIntoDerivedState from './helperFunctions/splitRawInputIntoDerivedState';
import ValuePreviews from './ValuePreviews';
import Submitter from './Submission/Submitter';

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

  /*
    On CTRL + Enter, submit a fetch request to add a new contact
    Sometimes an email is submitted
    A popup is always displayed
  */
  const [flashMessages, setFlashMessages] = useState([]);

  useEffect(() => {
    document.addEventListener('keydown', (event: any) => {
      async function asyncWrapper() {

        // if keydown events perfectly match
        if () {
          const submitter = new Submitter(firstName, lastName, companyName, employeeRoleCode, email, completeIntroSentence, contactStrategy, customContactChannel);
          const uiMessage = await submitter.addAndMaybeEmail(stateVar)
          setFlashMessages(flashMessages.concat(uiMessage));
        }
      };

      asyncWrapper();
    });
  }, []);

  /*
    cont
  */

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
      />
    </div>
  )
}

