import { combineReducers } from "redux"

import { POPOVER_VISIBLE } from "./actionTypes"

const initialState = {
  isPopoverVisible: false,
}

const pageOneReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
    case POPOVER_VISIBLE: {
      return {
        isPopoverVisible: action.bool,
      }
    }
  }
}

export const createRootReducer = () => combineReducers({
  pageOne: pageOneReducer,
})
