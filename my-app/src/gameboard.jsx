import React from 'react';
import GamePiece from './gamepiece.jsx';

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
      var newShip = this.getNewShip(index);
      if(!this.raisePlacementError(newShip)) {
        this.placeShip(newShip);
      }
    }
  }

  placeShip(newBoat) {
    var allBoats = this.state.ships;
    allBoats[this.state.current_boat] = newBoat;
    this.setState({
      ships: allBoats,
    })
    this.verifyAllShipsCompleted();
    return;
  }

  getNewShip(tile_index) {
    var boat_length = this.state.ships[this.state.current_boat].length
    var new_boat = Array(boat_length).fill(null);

    var direction = this.state.ship_direction;
    var directionMultiplier = direction === 'horizontal' ? 1 : 10;

    for (let i = 0; i < boat_length; i++) {
      new_boat[i] = (i * directionMultiplier) + tile_index
    }
    return new_boat;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ current_boat: nextProps.current_boat,
                    ship_direction: nextProps.ship_direction,
                  });
  }

  raisePlacementError(newBoat) {
    for (let key in this.state.ships) {
      for (let i = 0; i < newBoat.length; i++) {
        // rule 1: ship cannot be placed on top of another ship
        if (this.state.ships[key].includes(newBoat[i])) {
          console.log('error! Each boat piece must have its own tile');
          return true;
        }

        // rule 2: ship must be on the board - vertical check
        if (newBoat[i] > this.state.ocean_tiles.length) {
          console.log('error! Boat pieces must be placed on the board');
          return true;
        }
        // rule 3: ship cannot wrap into next row - horizontal check
        var startRow = Math.ceil(((newBoat[0] + 1) / 10));
        var endRow = Math.ceil(((newBoat.slice(-1).pop() + 1) / 10));

        if (startRow !== endRow) {
          console.log('error! Boat pieces must be placed in a single row');
          return true;
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

export default GameBoard;
