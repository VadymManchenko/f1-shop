import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, RootState, RootAction } from './rootReducer';
import { rootSaga } from './rootSaga';
import { rootEpic } from './rootEpic';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

const middlewares: Middleware[] = [
  thunk as ThunkMiddleware<RootState, RootAction>,
  sagaMiddleware,
  epicMiddleware,
];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic);

export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction> &
  typeof store.dispatch;
export type { RootState };
