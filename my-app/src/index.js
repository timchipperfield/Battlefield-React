import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import GameBoard from './gameboard.jsx';
import Game from './game.jsx';


// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
