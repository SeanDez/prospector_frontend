import React from 'react';
import styled from 'styled-components';

export default ({ firstName, lastName, companyName, employeeRoleCode, completeIntroSentence }: any) => (
  <OuterContainer>
    <span>{ firstName.length > 0 && `First Name: ${firstName}` }</span>
    <span>{ lastName.length > 0 && `Last Name: ${lastName}` }</span>
    <span>{ companyName.length > 0 && `Company: ${companyName}` }</span>
    <span>{ employeeRoleCode.length > 0 && `Employee Role Code: ${employeeRoleCode}` }</span>
    <span>{ completeIntroSentence.trim().length > 0 && `Intro Sentence: ${completeIntroSentence}` }</span>
    <span>{  }</span>
  </OuterContainer>
)

const OuterContainer = styled.p`
  display: flex;
  /* border: 2px dashed green; */

  & > * {
    /* border: 2px dashed red; */
    margin-left: 5vw;
  }
`;