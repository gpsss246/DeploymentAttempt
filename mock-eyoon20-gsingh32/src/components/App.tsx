import '../styles/main.css';
import REPL from './REPL';
import React from 'react';
import { LoadFile } from './User Stories/LoadFile';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />   
    </div>
  );
}

export default App;