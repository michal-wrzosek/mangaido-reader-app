import * as types from '../constants';
import { CancelToken } from '../axios';

const initialState = {
  readChapter: CancelToken.source(),
  createTranslation: CancelToken.source(),
  createComment: CancelToken.source(),
  removeComment: CancelToken.source(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CALL_READ_CHAPTER_BEGIN:
      return {
        ...state,
        readChapter: action.callToken,
      };
    case types.CALL_CREATE_TRANSLATION_BEGIN:
      return {
        ...state,
        createTranslation: action.callToken,
      };
    case types.CALL_CREATE_COMMENT_BEGIN:
      return {
        ...state,
        createComment: action.callToken,
      };
    case types.CALL_REMOVE_COMMENT_BEGIN:
      return {
        ...state,
        removeComment: action.callToken,
      };
    default:
      return state;
  }
};
