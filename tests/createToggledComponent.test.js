import React from "react"
import { Provider, connect } from "react-redux"
import { createStore, combineReducers } from "redux"

import { createToggledComponent } from "../src"


function AuthenticatedComponent(){
  return (<div>Authenticated</div>)
}

function AnonymousComponent(){
  return (<div>Anonymous</div>)
}

const rootReducer = combineReducers({
  auth: (state = {isAuthenticated: false}, action) => {
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
  },
})

const store = createStore(rootReducer)

const setAuthenticated = bool => ({
  type: "IS_AUTHENTICATED",
  bool,
})

function mountWithProvider(Component) {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

describe("createToggledComponent", () => {
  it("renders anonymous component when state matches", () => {
    store.dispatch(setAuthenticated(false))

    const ToggledComponent = createToggledComponent({
      connect,
      state: "auth.isAuthenticated",
      components: {
        Authenticated: AuthenticatedComponent,
        Anonymous: AnonymousComponent,
      },
    })

    const wrapper = mountWithProvider(ToggledComponent)

    expect(wrapper.html()).toBe("<div>Anonymous</div>")
  })
  it("renders authenticated component when state matches", () => {
    store.dispatch(setAuthenticated(true))

    const ToggledComponent = createToggledComponent({
      connect,
      state: "auth.isAuthenticated",
      components: {
        Authenticated: AuthenticatedComponent,
        Anonymous: AnonymousComponent
      }
    })

    const wrapper = mountWithProvider(ToggledComponent)

    expect(wrapper.html()).toBe("<div>Authenticated</div>")
  })
  it("renders anonymous component when state doesnt match", () => {
    store.dispatch(setAuthenticated(null))

    const ToggledComponent = createToggledComponent({
      connect,
      state: "auth.isAuthenticated",
      components: {
        Authenticated: AuthenticatedComponent,
        Anonymous: AnonymousComponent
      }
    })

    const wrapper = mountWithProvider(ToggledComponent)

    expect(wrapper.html()).toBe("<div>Anonymous</div>")
  })
})
