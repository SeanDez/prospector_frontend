import React from 'react';
import styled from 'styled-components';

const blue = { color: 'blue' };
const brown = { color: 'brown' };
const green = { color: 'green' };
const orange = { color: 'orange' };
const purple = { color: 'purple' };
const red = { color: 'red' };

export default ({ firstName, lastName, companyName, employeeRoleCode, email,completeIntroSentence }: any) => (
  <OuterContainer>
    <span style={blue}>{ firstName.length > 0 && `First Name: ${firstName}` }</span>
    <span style={red}>{ lastName.length > 0 && `Last Name: ${lastName}` }</span>
    <span style={brown}>{ companyName.length > 0 && `Company: ${companyName}` }</span>
    <span style={purple}>{ employeeRoleCode.length > 0 && `Employee Role Code: ${employeeRoleCode}` }</span>
    <span style={orange}>{ email.length > 0 && `Email: ${email}` }</span>

    {/* trimmed because it starts with 2 spaces due to concatenation */}
    <span style={green}>{ completeIntroSentence.trim().length > 0 && `Intro Sentence: ${completeIntroSentence}` }</span>
  </OuterContainer>
)

const OuterContainer = styled.p`
  border: 2px dashed white;
  padding: 0 3vw;
  display: flex;
  flex-flow: row nowrap;
  /* border: 2px dashed green; */

  & > * {
    /* border: 2px dashed red; */
    margin-right: 2vw;
  }
`;