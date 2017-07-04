import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import './index.css';

import gameState from './dux';
import { watchChooseDifficulty } from './sagas/game-start';

const saga = createSagaMiddleware();
let store = createStore(gameState, applyMiddleware(saga));
saga.run(watchChooseDifficulty);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
