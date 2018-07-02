import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.chapterImages.map(chapterImage => ({
        id: chapterImage.id,
        url: chapterImage.url,
        width: chapterImage.width,
        height: chapterImage.height,
      }));
    default:
      return state;
  }
};
