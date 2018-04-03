import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
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
      if(!this.raisePlacementError(index, this.state.ship_direction)) {
        this.placeShip(index, this.state.ship_direction);
      }
    }
  }

  placeShip(index, direction) {
    // find first that is not filled already
    for (var key in this.state.ships) {
      if(this.state.ships[key].includes(null)) {
        // loop inside each ship array looking for empty health slot / ocean tile
        for (let i = 0; i < this.state.ships[key].length; i++) {
          if(this.state.ships[key][i] === null) {
            // sets new tile number for boat placement
            var allBoats = this.state.ships;
            var directionMultiplier = direction === 'horizontal' ? 1 : 10

            allBoats[key].map((item, newIndex) => (
              allBoats[key].push((newIndex * directionMultiplier) + index)
            ))
            var filteredBoat = allBoats[key].filter(n => n);
            allBoats[key] = filteredBoat;
            this.setState({
              ships: allBoats,
            })

            console.log(this.state.ships);
            // switch game status to not place boats when placement complete
            this.verifyAllShipsCompleted();
            return;
          }
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ current_boat: nextProps.current_boat,
                    ship_direction: nextProps.ship_direction,
                  });
  }

  raisePlacementError(boatIndex, direction) {
    for (let key in this.state.ships) {
      if(this.state.ships[key].includes(boatIndex)) {
        console.log('error! Each boat piece must have its own tile');
        return true;
      }
    }

    var currentBoat = this.state.current_boat;
    var shipArrFiltered = this.state.ships[currentBoat].filter(n => n);
    if (shipArrFiltered === undefined || shipArrFiltered.length == 0) {
      return false;
    }

    console.log(shipArrFiltered);


    // var shipMax = Math.max(...shipArrFiltered);
    // var shipMin = Math.min(...shipArrFiltered);
    // var horizontalIndexBad = !(boatIndex === shipMax + 1 || boatIndex === shipMin - 1)
    //
    // if (horizontalIndexBad) {
    //   console.log('error! Must place ship in adjacent tile');
    //   return true;
    // }
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
            title="A"
            value={"ocean-" + index}
            onClick={() => {this.handleClick(index); this.props.ships(this.state.ships);}}>
            <GamePiece shipIndex={index} allShips={this.state.ships}/>
           </button>)
        )}
      </div>
    );
  }
}

class GamePiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipIndex: props.shipIndex,
      ships: props.allShips,
    }
  }

  setPiece() {
    for (let key in this.state.ships) {
      if(this.state.ships[key].includes(this.state.shipIndex)) {
        // returns the first letter of the ship name on that tile
        return capitalizeFirstLetter(key[0]);
      }
    }
  }

  render() {
    return (
      <p>{this.setPiece()}</p>
    )
  };
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
    var current_status = previous_status === 'Placing Boats' ? 'Using Cannon' : 'Placing Boats'
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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
