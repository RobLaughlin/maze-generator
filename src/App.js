import React from 'react';
import Sidepanel from './components/Sidepanel/Sidepanel.component';
import Maze from './components/Maze/Maze.component';
import MediaQuery from 'react-responsive';

function App() {
  return (
    <div className="App">
      <MediaQuery minWidth={600}>
        <div className="d-flex w-100">
          <Sidepanel/>
          <Maze />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={599}>
        <div>
          <Sidepanel/>
          <Maze />
        </div>
      </MediaQuery>
    </div>
  );
}

export default App;
