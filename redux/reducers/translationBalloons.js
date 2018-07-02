import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.translationBalloons.map(translationBalloon => ({
        id: translationBalloon.id,
        chapterImageId: translationBalloon.chapterImageId,
        position: translationBalloon.position,
        posX: translationBalloon.posX,
        posY: translationBalloon.posY,
        width: translationBalloon.width,
        height: translationBalloon.height,
        text: translationBalloon.text,
      }));
    default:
      return state;
  }
};
