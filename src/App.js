import React from 'react';
import FoundryGame from './FoundryGame';

import mission from './assets/mission.json'

import './App.css';

function App() {
  console.log(mission);

  return (
      <div className="App">
          <FoundryGame missionData={mission} />
      </div>
  );
}

export default App;
