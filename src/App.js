import React from 'react';
import Sidepanel from './components/Sidepanel/Sidepanel.component';
import Maze from './components/Maze/Maze.component';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MediaQuery minWidth={this.props.MIN_WIDTH}>
          <div className="d-flex w-100">
            <Sidepanel/>
            <Maze />
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={this.props.MAX_WIDTH}>
          <div>
            <Sidepanel/>
            <Maze />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    MAX_WIDTH: state.CONSTANTS.MAX_WIDTH,
    MIN_WIDTH: state.CONSTANTS.MIN_WIDTH
  }
}

export default connect(mapStateToProps)(App);
