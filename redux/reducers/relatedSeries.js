import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return action.relatedSeries.map(series => ({
        id: series.id,
        title: series.title,
        languageName: series.languageName,
        description: series.description,
        isForAdults: series.isForAdults,
        url: series.url,
        cover: {
          ver1600x800: series.cover.ver1600x800,
          ver800x400: series.cover.ver800x400,
          ver400x200: series.cover.ver400x200,
        },
        wideCover: {
          ver1920x320: series.wideCover.ver1920x320,
        },
      }));
    default:
      return state;
  }
};
