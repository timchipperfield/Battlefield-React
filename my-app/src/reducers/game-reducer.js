import * as types from '../actions/action-types';

export default (state = initialGameState, action) => {
  switch (action.type) {
    case types.ADD_SHIP:
      return [...state, Object.assign({}, action.ship)];
    default:
      return state;
  }
};


const initialGameState = "Placing Boats";
