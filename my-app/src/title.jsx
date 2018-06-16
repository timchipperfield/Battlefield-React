import React from 'react';
import DirectionToggle from './direction_toggle'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      current_boat: props.current_boat,
    }
  }

  findShipTitle() {
    if (this.state.current_boat === "aircraftCarrier") {
      return "Aircraft Carrier"
    } else if (typeof this.state.current_boat === 'string') {
      return capitalizeFirstLetter(this.state.current_boat);
    }
  }

  render() {
    if(this.state.status === 'Placing Boats') {
      return (
        <div>
          <h2>Game: {this.state.status}</h2>
          <div>
            <h3>Now Placing {this.findShipTitle()}</h3>
            <DirectionToggle
              ship_direction={this.state.ship_direction}
            />
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
}

export default Title;
