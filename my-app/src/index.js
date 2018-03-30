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
      current_boat: props.current_boat,
      ships: {
        aircraftCarrier: Array(6).fill(null),
        battleship: Array(5).fill(null),
        cruiser: Array(4).fill(null),
        submarine: Array(3).fill(null),
        destroyer: Array(2).fill(null),
      },
    };
  }

  handleClick(index) {
    if(this.state.game_state === 'setting boats') {
      // find first that is not filled already
      for (var key in this.state.ships) {
        if(this.state.ships[key].includes(null)) {
          // loop inside each ship array looking for empty health slot / ocean tile

          for (let i = 0; i < this.state.ships[key].length; i++) {
            if(this.state.ships[key][i] === null) {

              var boatName = key;
              var allBoats = this.state.ships;
              var boatCells = this.state.ships[key];
              allBoats[key][i] = index

              this.setState({
                ships: allBoats,
              })

              console.log(this.state.ships);
              return;
            }
          }
        }
      }

    }
  }

  render() {
    return (
      <div className="tile-set">
        {this.state.ocean_tiles.map((item, index) =>
          (<button className="ocean-tile"
            value={"ocean-" + index}
            onClick={() => this.handleClick(index)} />)
        )}
      </div>
    );
  }

}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'setting boats',
      current_boat: null,
    };
  }


  render() {
    return (
      <div className="game">
        <div className="game-board">
          <GameBoard game_status={this.state.status} current_boat={this.state.current_boat}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
