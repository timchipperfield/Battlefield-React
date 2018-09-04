import * as types from '../actions/action-types';

export default (state = initialOceanTileState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialOceanTileState = {
   tiles: Array(100).fill(null)
}
