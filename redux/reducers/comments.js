import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.comments.map(c => ({
        id: c.id,
        content: c.content,
        commentableId: c.commentableId,
        commentableType: c.commentableType,
        user: {
          id: c.user.id,
          name: c.user.name,
          uname: c.user.uname,
          url: c.user.url,
          avatarUrl: {
            ver100x100: c.user.avatarUrl.ver100x100,
            ver200x200: c.user.avatarUrl.ver200x200,
            ver400x400: c.user.avatarUrl.ver400x400,
          },
        },
        createdAt: {
          time: c.createdAt.time,
          timestamp: c.createdAt.timestamp,
          ago: c.createdAt.ago,
        },
      }));
    case types.CALL_CREATE_COMMENT_SUCCESS:
      return action.comments.map(c => ({
        id: c.id,
        content: c.content,
        commentableId: c.commentableId,
        commentableType: c.commentableType,
        user: {
          id: c.user.id,
          name: c.user.name,
          uname: c.user.uname,
          url: c.user.url,
          avatarUrl: {
            ver100x100: c.user.avatarUrl.ver100x100,
            ver200x200: c.user.avatarUrl.ver200x200,
            ver400x400: c.user.avatarUrl.ver400x400,
          },
        },
        createdAt: {
          time: c.createdAt.time,
          timestamp: c.createdAt.timestamp,
          ago: c.createdAt.ago,
        },
      }));
    case types.CALL_REMOVE_COMMENT_SUCCESS:
      return action.comments.map(c => ({
        id: c.id,
        content: c.content,
        commentableId: c.commentableId,
        commentableType: c.commentableType,
        user: {
          id: c.user.id,
          name: c.user.name,
          uname: c.user.uname,
          url: c.user.url,
          avatarUrl: {
            ver100x100: c.user.avatarUrl.ver100x100,
            ver200x200: c.user.avatarUrl.ver200x200,
            ver400x400: c.user.avatarUrl.ver400x400,
          },
        },
        createdAt: {
          time: c.createdAt.time,
          timestamp: c.createdAt.timestamp,
          ago: c.createdAt.ago,
        },
      }));
    default:
      return state;
  }
};
