import React from "react"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"

import { createToggledComponent } from "../src"


function AuthenticatedComponent(){
  return (<div>Authenticated</div>)
}

function AnonymousComponent(){
  return (<div>Anonymous</div>)
}

const authInitialState = {
  isAuthenticated: false
}

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    default:
      return state
    case "IS_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.value
      }
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(rootReducer)

const setIsAuthenticated = (value) => {
  return {
    type: "IS_AUTHENTICATED",
    value
  }
}

function mountWithProvider(Component) {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

describe("createToggledComponent", () => {
  it("renders anonymous component when state matches", () => {
    store.dispatch(setIsAuthenticated(false))
    const ToggledComponent = createToggledComponent({
      reducer: { name: "auth", key: "isAuthenticated" },
      components: {
        Authenticated: AuthenticatedComponent,
        Anonymous: AnonymousComponent,
      }
    })
    const wrapper = mountWithProvider(ToggledComponent)
    expect(wrapper.html()).toBe("<div>Anonymous</div>")
  })
  it("renders authenticated component when state matches", () => {
    store.dispatch(setIsAuthenticated(true))
    const ToggledComponent = createToggledComponent({
      reducer: { name: "auth", key: "isAuthenticated" },
      components: { 
        Authenticated: AuthenticatedComponent, 
        Anonymous: AnonymousComponent 
      }
    })
    const wrapper = mountWithProvider(ToggledComponent)
    expect(wrapper.html()).toBe("<div>Authenticated</div>")
  })
  it("renders anonymous component when state doesnt match", () => {
    const ToggledComponent = createToggledComponent({
      reducer: { name: "auth", key: "UnmatchedKey" },
      components: { 
        Authenticated: AuthenticatedComponent, 
        Anonymous: AnonymousComponent 
      }
    })
    const wrapper = mountWithProvider(ToggledComponent)
    expect(wrapper.html()).toBe("<div>Anonymous</div>")
  })
})
