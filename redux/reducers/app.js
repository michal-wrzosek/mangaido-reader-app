import * as types from '../constants';

const initialState = {
  isLoggedIn: false,
  currentPage: 'book',
  isLoading: true,
  isReceivedInitialData: false,
  isTranslation: false,
  apiUrl: '',
  baseUrl: '',
  createTranslationUrl: '',
  areCommentsLoading: true,
  isTranslationsFormLoading: false,
  windowWidth: typeof window === 'object' ? window.innerWidth : 320,
  windowHeight: typeof window === 'object' ? window.innerHeight : 480,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return {
        ...state,
        isLoggedIn: action.currentUser !== null,
        isLoading: false,
        isReceivedInitialData: true,
        isTranslation: action.translation !== null,
        apiUrl: action.apiUrl,
        baseUrl: action.baseUrl,
        createTranslationUrl: action.createTranslationUrl,
        areCommentsLoading: false,
      };


    case types.APP_PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.page,
      };


    // CREATE COMMENT
    case types.CALL_CREATE_COMMENT_BEGIN:
      return {
        ...state,
        areCommentsLoading: true,
      };
    case types.CALL_CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        areCommentsLoading: false,
      };
    case types.CALL_CREATE_COMMENT_CANCEL:
      return {
        ...state,
        areCommentsLoading: false,
      };
    case types.CALL_CREATE_COMMENT_FAIL:
      return {
        ...state,
        areCommentsLoading: false,
      };


    // REMOVE COMMENT
    case types.CALL_REMOVE_COMMENT_BEGIN:
      return {
        ...state,
        areCommentsLoading: true,
      };
    case types.CALL_REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        areCommentsLoading: false,
      };
    case types.CALL_REMOVE_COMMENT_CANCEL:
      return {
        ...state,
        areCommentsLoading: false,
      };
    case types.CALL_REMOVE_COMMENT_FAIL:
      return {
        ...state,
        areCommentsLoading: false,
      };


    // CREATE TRANSLATION FORM
    case types.CALL_CREATE_TRANSLATION_BEGIN:
      return {
        ...state,
        isTranslationsFormLoading: true,
      };
    case types.CALL_CREATE_TRANSLATION_SUCCESS:
      return {
        ...state,
        isTranslationsFormLoading: false,
      };
    case types.CALL_CREATE_TRANSLATION_CANCEL:
      return {
        ...state,
        isTranslationsFormLoading: false,
      };
    case types.CALL_CREATE_TRANSLATION_FAIL:
      return {
        ...state,
        isTranslationsFormLoading: false,
      };


    case types.APP_WINDOW_RESIZE:
      return {
        ...state,
        windowWidth: action.windowWidth,
        windowHeight: action.windowHeight,
      };
    default:
      return state;
  }
};
