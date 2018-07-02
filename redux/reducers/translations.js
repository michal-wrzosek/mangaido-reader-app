import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.translations.map(translation => ({
        id: translation.id,
        languageName: translation.languageName,
        viewCount: translation.viewCount,
        isPublished: translation.isPublished,
        createdAt: {
          time: translation.createdAt.time,
          timestamp: translation.createdAt.timestamp,
          ago: translation.createdAt.ago,
        },
        updatedAt: {
          time: translation.updatedAt.time,
          timestamp: translation.updatedAt.timestamp,
          ago: translation.updatedAt.ago,
        },
        user: {
          id: translation.user.id,
          name: translation.user.name,
          uname: translation.user.uname,
          url: translation.user.url,
          avatarUrl: {
            ver100x100: translation.user.avatarUrl.ver100x100,
            ver200x200: translation.user.avatarUrl.ver200x200,
            ver400x400: translation.user.avatarUrl.ver400x400,
          },
        },
        url: translation.url,
      }));
    default:
      return state;
  }
};
