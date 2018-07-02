import 'intersection-observer';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import App from '../containers/App';
import { windowResize } from '../redux/actions/app';

const store = configureStore();

window.addEventListener('resize', () => {
  store.dispatch(windowResize(window.innerWidth, window.innerHeight));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('reader-app'),
);
