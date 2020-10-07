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
  const textAreaRef = React.useRef('');

  return (
    <div>
      <form>
        <div>
          <label>All fields</label>
        </div>
        <div>
          <LargeTextArea
            // ref={textAreaRef}
            rows={8}
            placeholder="John Doe  Acme Inc  S  mrjohnfredriskdoe@acmecorpinternational.com  and I see your alma mater was in the sigma kappa epsilon fraternity and Duke state university. That's so cool, my friend went there and I love that school!  acm  Linkedin"
            onChange={(e: any) => setRawInputString(e.target.value) }
            onKeyDown={async ({ ctrlKey, key }: any) => {
              if (ctrlKey && key === "Enter") {
                
                const submitter = new Submitter(firstName, lastName, companyName, employeeRoleCode, email, completeIntroSentence, contactStrategy, customContactChannel);
                try {
                  const uiMessage = await submitter.addAndSometimesEmail();
                  // setFlashMessage((uiMessage));
  
                  // textAreaRef.current.value = '';  
                } catch (error) {
                  throw new Error(error);
                }
              }
            }}
          />
        </div>
        <ButtonContainer>
          <button
            // todo function to add to hubspot and email with gmail
          >Add and Email</button>
          <button>Add without Emailing</button>
        </ButtonContainer>
      </form>
    </div>
  )
}

const LargeTextArea = styled.textarea`
  margin: 30px auto;
  border: 2px dashed purple;
  width: 90vw;
  font-size: 1.4rem;
  line-height: 1.9rem;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  /* border: 2px dotted yellow; */
  display: flex;
  width: 80vw;
  justify-content: space-around;
`;