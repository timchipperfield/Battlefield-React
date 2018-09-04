import ships from './ships-reducer.js';
import oceanTiles from './ocean-tiles-reducer.js';
import game from './game-reducer.js';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  ships: ships,
  oceanTiles: oceanTiles,
  gameStatus: game,
});

export default rootReducer;
