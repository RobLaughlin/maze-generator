import React from 'react';
import Sidepanel from './components/Sidepanel/Sidepanel.component';
import Maze from './components/Maze/Maze.component';

function App() {
  return (
    <div className="App d-flex">
      <Sidepanel />
      <Maze />
    </div>
  );
}

export default App;
