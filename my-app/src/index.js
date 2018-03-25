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
    };
  }

  render() {
    return (
      <div>
        {this.state.ocean_tiles.map((item, index) =>          
          (<button className="ocean_tile" value={"ocean-" + index}/>)
        )}
      </div>
    );
  }

}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <GameBoard />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
