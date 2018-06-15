import React from 'react';
import GameBoard from './gameboard.jsx';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrentShip = this.updateCurrentShip.bind(this);
    this.updateGameStatus = this.updateGameStatus.bind(this);
    this.state = {
      status: 'Placing Boats',
      current_boat: null,
      error: null,
      ship_direction: 'horizontal',
    };
  }

  updateCurrentShip(ships) {
    for (let key in ships) {
      if(ships[key].includes(null)) {
        this.setState({
          current_boat: key,
        })
        return;
      }
    }
  }

  renderShipTitle() {
    if (this.state.current_boat === "aircraftCarrier") {
      return "Aircraft Carrier"
    } else if (typeof this.state.current_boat === 'string') {
      return capitalizeFirstLetter(this.state.current_boat);
    }
  }

  updateGameStatus(previous_status) {
    var current_status = previous_status === 'Placing Boats' ? 'Combat' : 'Placing Boats'
    this.setState({
      status: current_status,
    })
  }

  handleDirectionChange() {
    var direction = this.state.ship_direction === 'horizontal' ? 'vertical' : 'horizontal';
    this.setState({
      ship_direction: direction,
    })
  }

  renderHeader() {
    if(this.state.status === 'Placing Boats') {
      return (
        <div>
          <h2>Game: {this.state.status}</h2>
          <div>
            <h3>Now Placing {this.renderShipTitle()}</h3>
            <button onClick={() => {this.handleDirectionChange();}}>Toggle Direction</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Game: {this.state.status}</h2>
        </div>
      )
    }
  }

  renderError() {
    if(this.state.error != null) {
      return (
        <div>
          <h3>{this.state.error}</h3>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="game">
        {this.renderHeader()}
        {this.renderError()}
        <div className="game-board">
          <GameBoard
            game_status={this.state.status}
            ships={this.updateCurrentShip}
            status={this.updateGameStatus}
            current_boat={this.state.current_boat}
            ship_direction={this.state.ship_direction}
          />
        </div>
      </div>
    );
  }
}

export default Game;
