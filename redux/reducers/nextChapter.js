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
      if (action.nextChapter !== null) {
        return {
          ...state,
          id: action.nextChapter.id,
          title: action.nextChapter.title,
          type: action.nextChapter.type,
          readingDirection: action.nextChapter.readingDirection,
          isFirstPageACover: action.nextChapter.isFirstPageACover,
          backgroundColor: action.nextChapter.backgroundColor,
          url: action.nextChapter.url,
          newTranslationUrl: action.nextChapter.newTranslationUrl,
          cover: {
            ver640x260: action.nextChapter.cover.ver640x260,
            ver320x130: action.nextChapter.cover.ver320x130,
          },
          createdAt: {
            time: action.nextChapter.createdAt.time,
            timestamp: action.nextChapter.createdAt.timestamp,
            ago: action.nextChapter.createdAt.ago,
          },
          updatedAt: {
            time: action.nextChapter.updatedAt.time,
            timestamp: action.nextChapter.updatedAt.timestamp,
            ago: action.nextChapter.updatedAt.ago,
          },
          amountOfCoins: action.nextChapter.amountOfCoins,
          canRead: action.nextChapter.canRead,
        };
      }

      return state;
    default:
      return state;
  }
};
