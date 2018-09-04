import * as types from './action-types';

export const addShip = (shipIndex) => {
  return {
    type: types.ADD_SHIP,
    index: shipIndex
  };
}
