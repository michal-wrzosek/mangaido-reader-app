import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.chapters.map(chapter => ({
        id: chapter.id,
        title: chapter.title,
        url: chapter.url,
        newTranslationUrl: chapter.newTranslationUrl,
        cover: {
          ver640x260: chapter.cover.ver640x260,
          ver320x130: chapter.cover.ver320x130,
        },
        createdAt: {
          time: chapter.createdAt.time,
          timestamp: chapter.createdAt.timestamp,
          ago: chapter.createdAt.ago,
        },
        updatedAt: {
          time: chapter.updatedAt.time,
          timestamp: chapter.updatedAt.timestamp,
          ago: chapter.updatedAt.ago,
        },
        amountOfCoins: chapter.amountOfCoins,
        canRead: chapter.canRead,
      }));
    default:
      return state;
  }
};
