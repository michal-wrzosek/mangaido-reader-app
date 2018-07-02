import * as types from '../constants';

export function changePage(page) {
  return {
    type: types.APP_PAGE_CHANGE,
    page,
  };
}

export function getInitialData() {
  return (dispatch) => {
    const data = JSON.parse(
      document.getElementById('reader-app-initial-data').textContent,
    );

    return dispatch({
      type: types.RECEIVED_INITIAL_DATA,
      currentUser: data.currentUser,
      author: data.author,
      translator: data.translator,
      series: data.series,
      chapter: data.chapter,
      chapterImages: data.chapterImages,
      chapters: data.chapters,
      nextChapter: data.nextChapter,
      nextTranslation: data.nextTranslation,
      translation: data.translation,
      translationBalloons: data.translationBalloons,
      translations: data.translations,
      chapterReading: data.chapterReading,
      apiUrl: data.apiUrl,
      baseUrl: data.baseUrl,
      languages: data.languages,
      comments: data.comments,
      relatedSeries: data.relatedSeries,
      i18n: data.i18n,
    });
  };
}

export function windowResize(width, height) {
  return {
    type: types.APP_WINDOW_RESIZE,
    windowWidth: width,
    windowHeight: height,
  };
}
