import {
  combineReducers,
  createStore as createReduxStore,
} from "redux"

const coreInitialState = {
  isAuthenticated: false,
}

function coreReducer(state = coreInitialState, action) {
  switch (action.type) {
    default: {
      return state
    }
    case "IS_AUTHENTICATED": {
      return {
        ...state,
        isAuthenticated: action.bool,
      }
    }
  }
}

const rootReducer = combineReducers({
  core: coreReducer,
})

export const createStore = initialState => createReduxStore(rootReducer, initialState)

export const setAuthenticated = bool => ({
  type: "IS_AUTHENTICATED",
  bool,
})

export const isAuthenticatedState = "core.isAuthenticated"


