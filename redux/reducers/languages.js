import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.languages.map(l => ({
        code: l.code,
        name: l.name,
      }));
    default:
      return state;
  }
};
