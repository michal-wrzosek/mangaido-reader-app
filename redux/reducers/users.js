import * as types from '../constants';

const initialState = {
  currentUser: {
    id: -1,
    name: '',
    uname: '',
    url: '',
    avatarUrl: {
      ver100x100: '',
      ver200x200: '',
      ver400x400: '',
    },
  },
  author: {
    id: -1,
    name: '',
    uname: '',
    url: '',
    avatarUrl: {
      ver100x100: '',
      ver200x200: '',
      ver400x400: '',
    },
  },
  translator: {
    id: -1,
    name: '',
    uname: '',
    url: '',
    avatarUrl: {
      ver100x100: '',
      ver200x200: '',
      ver400x400: '',
    },
  },
};

let newState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVED_INITIAL_DATA:
      newState = {
        ...state,
        author: {
          id: action.author.id,
          name: action.author.name,
          uname: action.author.uname,
          url: action.author.url,
          avatarUrl: {
            ver100x100: action.author.avatarUrl.ver100x100,
            ver200x200: action.author.avatarUrl.ver200x200,
            ver400x400: action.author.avatarUrl.ver400x400,
          },
        },
      };

      if (action.currentUser !== null) {
        newState = {
          ...newState,
          currentUser: {
            id: action.currentUser.id,
            name: action.currentUser.name,
            uname: action.currentUser.uname,
            url: action.currentUser.url,
            avatarUrl: {
              ver100x100: action.currentUser.avatarUrl.ver100x100,
              ver200x200: action.currentUser.avatarUrl.ver200x200,
              ver400x400: action.currentUser.avatarUrl.ver400x400,
            },
          },
        };
      }

      if (action.translator !== null) {
        newState = {
          ...newState,
          translator: {
            id: action.translator.id,
            name: action.translator.name,
            uname: action.translator.uname,
            url: action.translator.url,
            avatarUrl: {
              ver100x100: action.translator.avatarUrl.ver100x100,
              ver200x200: action.translator.avatarUrl.ver200x200,
              ver400x400: action.translator.avatarUrl.ver400x400,
            },
          },
        };
      }

      return newState;
    default:
      return state;
  }
};
