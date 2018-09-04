import React from 'react';
import GameBoard from './gameboard.jsx';
import Title from './title.jsx';


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
        <Title
          status={this.state.status}
          current_boat={this.state.current_boat}
        />
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
