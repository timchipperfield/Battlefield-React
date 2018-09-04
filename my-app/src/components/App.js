import React, { Component } from 'react';
import './App.css';
// import PeopleContainer from './components/PeopleContainer'
// import ShipsContainer from '../containers/ShipsContainer'
import GameBoard from '../containers/gameboard'
// import OceanTileButtons from './components/OceanTileButtons'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Battleship React</h1>
        </header>
       <GameBoard />
      </div>
    );
  }
}

export default App;
