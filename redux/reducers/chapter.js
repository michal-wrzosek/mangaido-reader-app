import * as types from '../constants';

const initialState = {
  id: -1,
  title: '',
  type: 'webcomic', // book, webcomic
  readingDirection: 'ltr', // ltr, rtl
  isFirstPageACover: false,
  backgroundColor: '#000000',
  url: '',
  newTranslationUrl: '',
  cover: {
    ver640x260: '',
    ver320x130: '',
  },
  createdAt: {
    time: '',
    timestamp: 0,
    ago: '',
  },
  updatedAt: {
    time: '',
    timestamp: 0,
    ago: '',
  },
  amountOfCoins: 0,
  canRead: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return {
        ...state,
        id: action.chapter.id,
        title: action.chapter.title,
        type: action.chapter.type,
        readingDirection: action.chapter.readingDirection,
        isFirstPageACover: action.chapter.isFirstPageACover,
        backgroundColor: action.chapter.backgroundColor,
        url: action.chapter.url,
        newTranslationUrl: action.chapter.newTranslationUrl,
        cover: {
          ver640x260: action.chapter.cover.ver640x260,
          ver320x130: action.chapter.cover.ver320x130,
        },
        createdAt: {
          time: action.chapter.createdAt.time,
          timestamp: action.chapter.createdAt.timestamp,
          ago: action.chapter.createdAt.ago,
        },
        updatedAt: {
          time: action.chapter.updatedAt.time,
          timestamp: action.chapter.updatedAt.timestamp,
          ago: action.chapter.updatedAt.ago,
        },
        amountOfCoins: action.chapter.amountOfCoins,
        canRead: action.chapter.canRead,
      };
    default:
      return state;
  }
};
