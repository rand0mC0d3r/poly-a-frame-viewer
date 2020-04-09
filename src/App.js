import React from 'react';

import PolySearch from './components/PolySearch/PolySearch';

import './App.css';

function App() {
  return (
    <div className="App__container">
      <div className="App__search">
        <PolySearch />
      </div>
      <div className="App__preview">
        preview
      </div>
    </div>
  );
}

export default App;
