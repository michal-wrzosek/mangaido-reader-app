import axios, { CancelToken } from '../axios';
import * as types from '../constants';

function calculateReadingProgress(pageIndex, nrOfPages) {
  return nrOfPages > 0 ?
    Math.round(((pageIndex + 1) / nrOfPages) * 100) : 0;
}

function callReadChapter(dispatch, getState) {
  const { currentUser } = getState().users;

  if (currentUser.id !== -1) {
    const { apiUrl } = getState().app;
    const { id: chapterId } = getState().chapter;
    const { readingProgress } = getState().book;
    const { readChapter: callToken } = getState().callTokens;

    callToken.cancel();
    const newCallToken = CancelToken.source();

    dispatch({
      type: types.CALL_READ_CHAPTER_BEGIN,
      callToken: newCallToken,
    });

    return axios.post(`${apiUrl}/users/read_chapter`,
      {
        chapter_id: chapterId,
        reading_progress: readingProgress,
        set_as_read: readingProgress === 100,
      },
      { cancelToken: newCallToken.token },
    )
    .then(() => dispatch({ type: types.CALL_READ_CHAPTER_SUCCESS }))
    .catch((error) => {
      if (axios.isCancel(error)) {
        dispatch({ type: types.CALL_READ_CHAPTER_CANCEL, error });
      } else {
        dispatch({ type: types.CALL_READ_CHAPTER_FAIL, error });
      }
    });
  }

  return true;
}

export function nextPage() {
  return (dispatch, getState) => {
    const nrOfPages = getState().chapterImages.length;
    const { currentPageIndex } = getState().book;
    const newPageIndex = currentPageIndex < (nrOfPages - 1) ?
      (currentPageIndex + 1) : (nrOfPages - 1);
    const readingProgress = calculateReadingProgress(newPageIndex, nrOfPages);

    if (currentPageIndex < nrOfPages - 1) {
      dispatch({
        type: types.BOOK_CHANGE_PAGE,
        pageIndex: newPageIndex,
        readingProgress,
      });

      callReadChapter(dispatch, getState);
    } else {
      dispatch({ type: types.BOOK_FINISHED });
      dispatch({ type: types.BOOK_ENDING_PAGE_OPENED });
    }
  };
}

export function previousPage() {
  return (dispatch, getState) => {
    const nrOfPages = getState().chapterImages.length;
    const { currentPageIndex } = getState().book;
    const newPageIndex = currentPageIndex > 0 ?
      (currentPageIndex - 1) : 0;
    const readingProgress = calculateReadingProgress(newPageIndex, nrOfPages);

    if (currentPageIndex > 0) {
      dispatch({
        type: types.BOOK_CHANGE_PAGE,
        pageIndex: newPageIndex,
        readingProgress,
      });

      callReadChapter(dispatch, getState);
    } else {
      dispatch({ type: types.BOOK_BEGINNING });
    }
  };
}

export function changePage(pageIndex) {
  return (dispatch, getState) => {
    const nrOfPages = getState().chapterImages.length;
    const { currentPageIndex } = getState().book;

    if (
      pageIndex >= 0 &&
      pageIndex <= (nrOfPages - 1) &&
      pageIndex !== currentPageIndex
    ) {
      dispatch({
        type: types.BOOK_CHANGE_PAGE,
        pageIndex,
        readingProgress: calculateReadingProgress(pageIndex, nrOfPages),
      });

      callReadChapter(dispatch, getState);
    } else if (pageIndex < 0) {
      dispatch({
        type: types.BOOK_CHANGE_PAGE,
        pageIndex: 0,
        readingProgress: calculateReadingProgress(0, nrOfPages),
      });

      dispatch({ type: types.BOOK_BEGINNING });
      callReadChapter(dispatch, getState);
    } else if (pageIndex > (nrOfPages - 1)) {
      dispatch({
        type: types.BOOK_CHANGE_PAGE,
        pageIndex: nrOfPages - 1,
        readingProgress: calculateReadingProgress(nrOfPages - 1, nrOfPages),
      });

      dispatch({ type: types.BOOK_FINISHED });
      dispatch({ type: types.BOOK_ENDING_PAGE_OPENED });
      callReadChapter(dispatch, getState);
    }
  };
}

export function selectBalloon(balloonId) {
  return {
    type: types.BOOK_SELECT_BALLOON,
    balloonId,
  };
}

export function deselectBalloons() {
  return { type: types.BOOK_DESELECT_BALLOONS };
}

export function closeEndingPage() {
  return { type: types.BOOK_ENDING_PAGE_CLOSED };
}

export function zoomIn() {
  return { type: types.BOOK_ZOOMED_IN };
}

export function zoomOut() {
  return { type: types.BOOK_ZOOMED_OUT };
}
