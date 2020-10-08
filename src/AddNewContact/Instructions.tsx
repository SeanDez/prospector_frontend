import React from 'react';
import styled from 'styled-components';

export default () => (
  <div>
    <h3>Usage Instructions</h3>
    <StyledOrderedList>
      <li>Enter the data specified by the order above into the main textbox, separated by double spaces.</li>
      <li>Press CTRL + Enter to submit your contact information.</li>
      <li>The text box will automatically blank on successful submission, allow you to submit the next item without using the mouse.</li>
    </StyledOrderedList>
  </div>
)

const StyledOrderedList = styled.ol`
  & li {
    text-align: left;
  }
`;