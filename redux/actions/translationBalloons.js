import * as types from '../constants';

export function changeSide(translationBalloonId, side) {
  return {
    type: types.TRANSLATION_BALLOONS_SIDE_CHANGE,
    translationBalloonId,
    side,
  };
}
