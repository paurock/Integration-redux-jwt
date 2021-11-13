import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/combineReducers";
import thunk from "redux-thunk";

const defaultState = {};

export const store = createStore(
  reducers,
  defaultState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
