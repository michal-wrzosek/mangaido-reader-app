import * as types from '../constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:

      /* eslint-disable no-param-reassign */
      return action.translationBalloons.reduce((sum, n) => {
        sum[n.id] = {
          side: 'screen', // 'up', 'right', 'down', 'left', 'screen'
        };

        return sum;
      }, {});
      /* eslint-enable no-param-reassign */
    case types.TRANSLATION_BALLOONS_SIDE_CHANGE:
      return {
        ...state,
        [action.translationBalloonId]: {
          ...state[action.translationBalloonId],
          side: action.side,
        },
      };
    default:
      return state;
  }
};
