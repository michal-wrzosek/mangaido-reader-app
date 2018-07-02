import * as types from '../constants';

const initialState = {
  id: -1,
  title: '',
  languageName: '',
  description: '',
  isForAdults: false,
  url: '',
  cover: {
    ver1600x800: '',
    ver800x400: '',
    ver400x200: '',
  },
  wideCover: {
    ver1920x320: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      return {
        ...state,
        id: action.series.id,
        title: action.series.title,
        languageName: action.series.languageName,
        description: action.series.description,
        isForAdults: action.series.isForAdults,
        url: action.series.url,
        cover: {
          ver1600x800: action.series.cover.ver1600x800,
          ver800x400: action.series.cover.ver800x400,
          ver400x200: action.series.cover.ver400x200,
        },
        wideCover: {
          ver1920x320: action.series.wideCover.ver1920x320,
        },
      };
    default:
      return state;
  }
};
