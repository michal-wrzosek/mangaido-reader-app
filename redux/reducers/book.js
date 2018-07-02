import * as types from '../constants';

const initialState = {
  currentPageIndex: 0,
  lastPageIndex: 0,
  nrOfPages: 0,
  pageRatio: 0.704, // 0.0 - 1.0
  currentBalloonId: -1,
  readingProgress: 0, // 0 - 100 (%)
  bookType: 'webcomic', // book, webcomic
  isEndingPageOpen: false,
  isZoomed: false,
};

const calculateCurrentPageIndex = (action) => {
  if (action.chapterReading === null) {
    return 0;
  }

  if (action.chapterReading.readingProgress === 0) {
    return 0;
  }

  return Math.round(
    (
      action.chapterReading.readingProgress *
      action.chapterImages.length
    ) / 100,
  ) - 1;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      if (action.chapterImages.length) {
        return {
          ...state,
          pageRatio: (
            action.chapterImages[0].width /
            action.chapterImages[0].height
          ),
          nrOfPages: action.chapterImages.length,
          readingProgress: action.chapterReading !== null ?
            action.chapterReading.readingProgress : 0,
          currentPageIndex: calculateCurrentPageIndex(action),
          bookType: action.chapter.type,
        };
      }
      return { ...state };
    case types.BOOK_CHANGE_PAGE:
      return {
        ...state,
        lastPageIndex: state.currentPageIndex,
        currentPageIndex: action.pageIndex,
        readingProgress: action.readingProgress,
        currentBalloonId: -1,
      };
    case types.BOOK_FINISHED:
      return {
        ...state,
        currentBalloonId: -1,
      };
    case types.BOOK_BEGINNING:
      return {
        ...state,
        currentBalloonId: -1,
      };
    case types.BOOK_SELECT_BALLOON:
      return {
        ...state,
        currentBalloonId: action.balloonId,
      };
    case types.BOOK_DESELECT_BALLOONS:
      return {
        ...state,
        currentBalloonId: -1,
      };
    case types.BOOK_ENDING_PAGE_OPENED:
      return {
        ...state,
        isEndingPageOpen: true,
      };
    case types.BOOK_ENDING_PAGE_CLOSED:
      return {
        ...state,
        isEndingPageOpen: false,
      };
    case types.BOOK_ZOOMED_IN:
      return {
        ...state,
        isZoomed: true,
      };
    case types.BOOK_ZOOMED_OUT:
      return {
        ...state,
        isZoomed: false,
      };
    default:
      return state;
  }
};
