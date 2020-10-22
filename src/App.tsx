import React, { useState } from 'react';
import styled from 'styled-components';

import AddView from './AddNewContact/View';
import LoginBox from './LoginBox/LoginBox';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // login box
  if (isLoggedIn === false) {
    return (
      <OuterContainer>
        <LoginBox 
          setIsLoggedIn={setIsLoggedIn}
        />
      </OuterContainer>
    )
  }


  // progam view
  return (
    <OuterContainer>
      <header className="App-header">
        <AddView />
      </header>
    </OuterContainer>
  );
}

export default App;

const OuterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 80vw;
  
  & * {
    text-align: center;
  }
`;