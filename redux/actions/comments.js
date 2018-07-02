import axios, { CancelToken } from '../axios';
import * as types from '../constants';

export function create(content) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().app;
    const { id: chapterId } = getState().chapter;
    const { createComment: callToken } = getState().callTokens;

    callToken.cancel();
    const newCallToken = CancelToken.source();

    dispatch({
      type: types.CALL_CREATE_COMMENT_BEGIN,
      callToken: newCallToken,
    });

    return axios.post(`${apiUrl}/chapters/${chapterId}/comments`,
      {
        comment: {
          content,
        },
      },
      { cancelToken: newCallToken.token },
    )
      .then(response => response.data)
      .then(data => dispatch({
        type: types.CALL_CREATE_COMMENT_SUCCESS,
        comment: {
          id: data.comment.id,
          content: data.comment.content,
          commentableId: data.comment.commentableId,
          commentableType: data.comment.commentableType,
          user: {
            id: data.comment.user.id,
            name: data.comment.user.name,
            uname: data.comment.user.uname,
            url: data.comment.user.url,
            avatarUrl: {
              ver100x100: data.comment.user.avatarUrl.ver100x100,
              ver200x200: data.comment.user.avatarUrl.ver200x200,
              ver400x400: data.comment.user.avatarUrl.ver400x400,
            },
          },
          createdAt: {
            time: data.comment.createdAt.time,
            timestamp: data.comment.createdAt.timestamp,
            ago: data.comment.createdAt.ago,
          },
        },
        comments: data.comments.map(c => ({
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
        })),
      }))
      .catch((error) => {
        if (axios.isCancel(error)) {
          dispatch({ type: types.CALL_CREATE_COMMENT_CANCEL, error });
        } else {
          dispatch({ type: types.CALL_CREATE_COMMENT_FAIL, error });
        }
      });
  };
}

export function remove(commentId) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().app;
    const { id: chapterId } = getState().chapter;
    const { removeComment: callToken } = getState().callTokens;

    callToken.cancel();
    const newCallToken = CancelToken.source();

    dispatch({
      type: types.CALL_REMOVE_COMMENT_BEGIN,
      callToken: newCallToken,
    });

    return axios.delete(`${apiUrl}/chapters/${chapterId}/comments/${commentId}`,
      {},
      { cancelToken: newCallToken.token },
    )
      .then(response => response.data)
      .then(data => dispatch({
        type: types.CALL_REMOVE_COMMENT_SUCCESS,
        comments: data.comments.map(c => ({
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
        })),
      }))
      .catch((error) => {
        if (axios.isCancel(error)) {
          dispatch({ type: types.CALL_REMOVE_COMMENT_CANCEL, error });
        } else {
          dispatch({ type: types.CALL_REMOVE_COMMENT_FAIL, error });
        }
      });
  };
}
