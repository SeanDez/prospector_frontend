import React, { useEffect } from 'react';
import './App.scss';

import AddView from './AddNewContact/View';
import CustomPropertyManager from './InitialLoad/CustomPropertyManager';

function App() {

  // get all properties for the account
  // check if each custom property is there
  // add any missing custom properties;
  useEffect(() => {
    async function wrapper() {
      const customPropertyManager = new CustomPropertyManager();
      const result: object[] | null = await customPropertyManager.verifyOrAddCustomProperties();
      console.log('result of customPropertyManager.verifyOrAddCustomProperties', result);
    }

    wrapper();
  }, [])

  return (
    <div>
      <header className="App-header">
        <AddView />
      </header>
    </div>
  );
}

export default App;
