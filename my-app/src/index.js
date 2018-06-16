import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './game.jsx';


// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
