import {
  createStore as createReduxStore,
  applyMiddleware,
  compose,
} from "redux"

import { createRootReducer } from "./reducer"

export const createStore = (initialState = {}) => {
  const rootReducer = createRootReducer()
  const middleware = [
    //..
  ]
  const storeEnhancers = compose(applyMiddleware(...middleware))
  const store = createReduxStore(rootReducer, initialState, storeEnhancers)
  return store
}
