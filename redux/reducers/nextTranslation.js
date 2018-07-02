import * as types from '../constants';

const initialState = {
  id: -1,
  languageName: '',
  viewCount: 0,
  isPublished: true,
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
  url: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      if (action.nextTranslation !== null) {
        return {
          ...state,
          id: action.nextTranslation.id,
          languageName: action.nextTranslation.languageName,
          viewCount: action.nextTranslation.viewCount,
          isPublished: action.nextTranslation.isPublished,
          createdAt: {
            time: action.nextTranslation.createdAt.time,
            timestamp: action.nextTranslation.createdAt.timestamp,
            ago: action.nextTranslation.createdAt.ago,
          },
          updatedAt: {
            time: action.nextTranslation.updatedAt.time,
            timestamp: action.nextTranslation.updatedAt.timestamp,
            ago: action.nextTranslation.updatedAt.ago,
          },
          url: action.nextTranslation.url,
        };
      }

      return state;
    default:
      return state;
  }
};
