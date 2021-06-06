import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;