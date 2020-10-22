import React from 'react';
import styled from 'styled-components';
import Submitter from './Submission/Submitter';

interface PropsShape {
  setRawInputString: Function;
  setFlashMessage: Function;
  firstName: string;
  lastName: string;
  companyName: string;
  employeeRoleCode: string; 
  email: string; 
  completeIntroSentence: string;
  contactStrategy: string;
  customContactChannel: string;
}

export default ({ setRawInputString, setFlashMessage, firstName, lastName, companyName, employeeRoleCode, email, completeIntroSentence, contactStrategy, customContactChannel }: PropsShape) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <form>
        <FormHeader>
          <label>Condsolidated Input Box</label>
          <p>Order: First name, Last name, Company name, Employee Role Code (R: Recruiter, S: Sales, T: Technical/Engineer), Email address, Introductory Sentence, Contact Strategy (AE: Add and Email, AU: Add as Uncontacted, ACM: Add with Custom contact Method), Custom contact channel (optional, for ACM contact strategy only)</p>
        </FormHeader>
        <div>
          <LargeTextArea
            ref={textAreaRef}
            rows={8}
            placeholder="John Doe  Acme Inc  S  mrjohnfredriskdoe@acmecorpinternational.com  and I see your alma mater was in the sigma kappa epsilon fraternity and Duke state university. That's so cool, my friend went there and I love that school!  acm  Linkedin"
            onChange={(e: any) => setRawInputString(e.target.value) }
            onKeyDown={async ({ ctrlKey, key }: any) => {
              if (ctrlKey && key === "Enter") {
                
                const submitter = new Submitter(firstName, lastName, companyName, employeeRoleCode, email, completeIntroSentence, contactStrategy, customContactChannel);
                try {
                  const uiMessage = await submitter.addAndSometimesEmail();
                  setFlashMessage((uiMessage));

                  /* The ref is used to clear state without blipping
                    using the state setter to force rerender clears the old ui data
                  */
                  if (textAreaRef.current) { textAreaRef.current.value = ''; }
                  setRawInputString('');
                } catch (error) {
                  throw new Error(error);
                }
              }
            }}
          />
        </div>
      </form>
    </div>
  )
}

const LargeTextArea = styled.textarea`
  margin: 30px auto;
  border: 2px solid darkgray;
  width: 90%;
  max-width: 1000px;
  font-size: 1.4rem;
  line-height: 1.9rem;
`;

const FormHeader = styled.div`
  margin: 3vh auto;
  width: 80vw;
`;