import React, { useEffect } from 'react';
import styled from 'styled-components';

import AddView from './AddNewContact/View';
import CustomPropertyManager from './InitialLoad/CustomPropertyManager';

function App() {
  // verify or add custom properties
  useEffect(() => {
    async function wrapper() {
      const customPropertyManager = new CustomPropertyManager();
      const result: object[] | null = await customPropertyManager.verifyOrAddCustomProperties();
      console.log('result of customPropertyManager.verifyOrAddCustomProperties', result);
    }

    wrapper();
  }, [])

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