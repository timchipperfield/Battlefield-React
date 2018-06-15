import React from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

export default GamePiece;
