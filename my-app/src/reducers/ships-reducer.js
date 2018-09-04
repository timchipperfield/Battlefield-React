import * as types from '../actions/action-types';

export default (state = initialShipsState, action) => {
  switch (action.type) {
    case types.ADD_SHIP:
      return [...state, Object.assign({}, action.ship)];
    default:
      return state;
  }
};

const initialShipsState = {
    aircraftCarrier: Array(6).fill(null),
    battleship: Array(5).fill(null),
    cruiser: Array(4).fill(null),
    submarine: Array(3).fill(null),
    destroyer: Array(2).fill(null)
};





// export default function(state = [], action) {
//   switch (action.type) {
//   case FETCH_WEATHER:
//     return [action.payload.data, ...state];
//   }
//   return state
// }
