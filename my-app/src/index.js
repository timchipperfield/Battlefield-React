import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ocean_tiles: Array(100).fill(null),
      game_state: props.game_status,
      ships: {
        aircraftCarrier: Array(6).fill(null),
        battleship: Array(5).fill(null),
        cruiser: Array(4).fill(null),
        submarine: Array(3).fill(null),
        destroyer: Array(2).fill(null),
      },
    };
    this.props.ships(this.state.ships);
  }

  handleClick(index) {
    if(this.state.game_state === 'Placing Boats') {
      // find first that is not filled already
      for (var key in this.state.ships) {
        if(this.state.ships[key].includes(null)) {
          // loop inside each ship array looking for empty health slot / ocean tile
          for (let i = 0; i < this.state.ships[key].length; i++) {
            if(this.state.ships[key][i] === null) {
              // sets new tile number for boat placement
              var allBoats = this.state.ships;
              allBoats[key][i] = index
              this.setState({
                ships: allBoats,
              })

              console.log(this.state.ships);
              // switch game status to not place boats when placement complete
              this.verifyAllShipsCompleted()
              return;
            }
          }
        }
      }
    }
  }

  verifyAllShipsCompleted() {
    var shipsFinished = Array(this.state.ships.length);
    for (let key in this.state.ships) {
      if(this.state.ships[key].includes(null)) {
        shipsFinished.push(false);
      } else {
        shipsFinished.push(true);
      }
    }
    if(!shipsFinished.includes(false)) {
      this.props.status(this.state.game_state);
    }
  }

  render() {
    return (
      <div className="tile-set">
        {this.state.ocean_tiles.map((item, index) =>
          (<button className="ocean-tile"
            value={"ocean-" + index}
            onClick={() => {this.handleClick(index); this.props.ships(this.state.ships);}} />)
        )}
      </div>
    );
  }
}


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
    };
  }

  updateCurrentShip(ships) {
    for (let key in ships) {
      if(ships[key].includes(null)) {
        if (key === "aircraftCarrier") {
          var ship = "Aircraft Carrier"
        } else {
          var ship = capitalizeFirstLetter(key);
        }
        this.setState({
          current_boat: ship,
        })
        return;
      }
    }
  }

  updateGameStatus(previous_status) {
    var current_status = previous_status === 'Placing Boats' ? 'Using Cannon' : 'Placing Boats'
    this.setState({
      status: current_status,
    })
  }

  renderHeader() {
    if(this.state.status === 'Placing Boats') {
      return (
        <div>
          <h2>Game: {this.state.status}</h2>
          <h3>Now Placing {this.state.current_boat}</h3>
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

  render() {
    return (
      <div className="game">
        {this.renderHeader()};
        <div className="game-board">
          <GameBoard
            game_status={this.state.status}
            ships={this.updateCurrentShip}
            status={this.updateGameStatus}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
