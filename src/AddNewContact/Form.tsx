import React from 'react';
import styled from 'styled-components';

interface PropsShape {
  setRawInputString: Function
}

export default ({ setRawInputString }: PropsShape) => {

  return (
    <div>
      <form>
        <div>
          <label>All fields</label>
        </div>
        <div>
          <LargeTextArea 
            rows={8}
            placeholder="John Doe  Acme Inc  E  mrjohnfredriskdoe@acmecorpinternational.com  and I see your alma mater was in the sigma kappa epsilon fraternity and Duke state university. That's so cool, my friend went there and I love that school!"
            onChange={(e: any) => setRawInputString(e.target.value) }
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