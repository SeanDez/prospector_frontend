import React from 'react';
import styled from 'styled-components';

const blue = { color: 'blue' };
const brown = { color: 'brown' };
const green = { color: 'green' };
const orange = { color: 'orange' };
const purple = { color: 'purple' };
const red = { color: 'red' };

function transformContactStrategyCodeIntoLabel(contactStrategyState: string) {
  const normalizedStrategy = contactStrategyState.trim().toLowerCase();

  if (normalizedStrategy === 'ae') {
    return 'Add & Email';
  } else if (normalizedStrategy === 'au') {
    return 'Add as Uncontacted';
  } else if (normalizedStrategy === 'acm') {
    return 'Add as Contacted via Custom Method';
  }

  else return 'Valid options: "ae", "au", or "acm"';
}

export default ({ firstName, lastName, companyName, employeeRoleCode, email,completeIntroSentence, contactStrategy, customContactChannel }: any) => (
  <OuterContainer>
    <div>
      <p>Previews Of All Entered Inputs</p>
    </div>
    <ValuesContainer>
      <span>{ firstName.length === 0 && 'No values have been entered' }</span>
      <span style={blue}>{ firstName.length > 0 && `First Name: ${firstName}` }</span>
      <span style={red}>{ lastName.length > 0 && `Last Name: ${lastName}` }</span>
      <span style={brown}>{ companyName.length > 0 && `Company: ${companyName}` }</span>
      <span style={purple}>{ employeeRoleCode.length > 0 && `Employee Role Code: ${employeeRoleCode}` }</span>
      <span style={orange}>{ email.length > 0 && `Email: ${email}` }</span>

    </ValuesContainer>

    <ValuesContainer>
      {/* trimmed because it starts with 2 spaces due to concatenation */}
      <span style={green}>{ completeIntroSentence.trim().length > 0 && `Intro Sentence: ${completeIntroSentence}` }</span>

      <span>{ contactStrategy.length > 0 && `Contact Strategy: ${transformContactStrategyCodeIntoLabel(contactStrategy)}` }</span>
      <span>{ customContactChannel.length > 0 && `Contact Channel: ${customContactChannel}` }</span>
    </ValuesContainer>
  </OuterContainer>
)

const OuterContainer = styled.div`
  border: 1px solid darkgray;
`;

const ValuesContainer = styled.div`
  padding: 1vh 3vw 1vh 3vw;
  display: flex;
  flex-flow: row nowrap;

  & span {
    margin-right: 2vw;
  }
`;