import React, { Component } from 'react';
import GamePiece from './gamepiece.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shipActions from '../actions/ship-actions';

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      current_boat: 'aircraftCarrier',
      ship_direction: 'horizontal',
    }


    // this.state = {
    //   ocean_tiles: Array(100).fill(null),
    //   game_state: props.game_status,
    //   ships: {
    //     aircraftCarrier: Array(6).fill(null),
    //     battleship: Array(5).fill(null),
    //     cruiser: Array(4).fill(null),
    //     submarine: Array(3).fill(null),
    //     destroyer: Array(2).fill(null),
    //   },
    // };
    // this.props.ships(this.state.ships);
  }

  handleClick(index) {
    if(this.props.game_status === 'Placing Boats') {
      var newShip = this.getNewShip(index);
      if(!this.raisePlacementError(newShip)) {
        this.placeShip(newShip);
      }
    }
  }

  placeShip(newBoat) {
    var allBoats = this.props.ships;
    console.log(allBoats);
    allBoats[this.state.current_boat] = newBoat;
    this.setState({
      ships: allBoats,
    })
    this.verifyAllShipsCompleted();
    return;
  }

  getNewShip(tile_index) {
    var boat_length = this.props.ships[this.state.current_boat].length
    var new_boat = Array(boat_length).fill(null);

    var direction = this.state.ship_direction;
    var directionMultiplier = direction === 'horizontal' ? 1 : 10;

    for (let i = 0; i < boat_length; i++) {
      new_boat[i] = (i * directionMultiplier) + tile_index
    }
    return new_boat;
  }


  raisePlacementError(newBoat) {
    console.log(newBoat);
    for (let key in this.props.ships) {
      for (let i = 0; i < newBoat.length; i++) {
        // rule 1: ship cannot be placed on top of another ship
        if (this.props.ships[key].includes(newBoat[i])) {
          console.log('error! Each boat piece must have its own tile');
          return true;
        }

        // rule 2: ship must be on the board - vertical check
        if (newBoat[i] > this.props.ocean_tiles.length) {
          console.log('error! Boat pieces must be placed on the board');
          return true;
        }
        // rule 3: ship cannot wrap into next row - horizontal check
        if (this.state.ship_direction == 'horizontal') {
          var startRow = Math.ceil(((newBoat[0] + 1) / 10));
          var endRow = Math.ceil(((newBoat.slice(-1).pop() + 1) / 10));

          if (startRow !== endRow) {
            console.log('error! Boat pieces must be placed in a single row');
            return true;
          }
        }
      }
    }
  }

  verifyAllShipsCompleted() {
    var shipsFinished = Array(this.props.ships.length);
    for (let key in this.props.ships) {
      if(this.props.ships[key].includes(null)) {
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
    console.log(this.props.ships);
    return (
      <div className="tile-set">
      {this.props.ocean_tiles.map((item, index) =>
        (<button className="ocean-tile"
          title="A"
          value={"ocean-" + index}
          onClick={() => this.handleClick(index) }>
          <GamePiece shipIndex={index} allShips={this.props.ships}/>
         </button>)
      )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ships: state.ships,
    ocean_tiles: state.oceanTiles.tiles,
    game_status: state.gameStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(shipActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
