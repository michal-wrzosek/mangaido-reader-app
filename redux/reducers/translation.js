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
      if (action.translation !== null) {
        return {
          ...state,
          id: action.translation.id,
          languageName: action.translation.languageName,
          viewCount: action.translation.viewCount,
          isPublished: action.translation.isPublished,
          createdAt: {
            time: action.translation.createdAt.time,
            timestamp: action.translation.createdAt.timestamp,
            ago: action.translation.createdAt.ago,
          },
          updatedAt: {
            time: action.translation.updatedAt.time,
            timestamp: action.translation.updatedAt.timestamp,
            ago: action.translation.updatedAt.ago,
          },
          url: action.translation.url,
        };
      }

      return state;
    default:
      return state;
  }
};
