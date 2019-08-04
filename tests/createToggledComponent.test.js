import React from "react"
import { Provider, connect } from "react-redux"

import { createToggledComponent } from "../src"
import {
  setAuthenticated,
  isAuthenticatedState,
  createStore,
} from "./redux"

function AuthenticatedComponent(){
  return (<div>Authenticated</div>)
}

const authenticatedHTML = "<div>Authenticated</div>"

function AnonymousComponent(){
  return (<div>Anonymous</div>)
}

const anonymousHTML = "<div>Anonymous</div>"

function setup(store, Component) {
  return mount(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

describe("createToggledComponent", () => {
  it("renders anonymous component when state matches", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(false))

    const ToggledComponent = createToggledComponent({
      connect,
      path: isAuthenticatedState,
      components: {
        authenticated: AuthenticatedComponent,
        anonymous: AnonymousComponent,
      },
    })

    const wrapper = setup(store, ToggledComponent)

    expect(wrapper.html()).toBe(anonymousHTML)
  })
  it("renders authenticated component when state matches", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(true))

    const ToggledComponent = createToggledComponent({
      connect,
      path: isAuthenticatedState,
      components: {
        authenticated: AuthenticatedComponent,
        anonymous: AnonymousComponent
      }
    })

    const wrapper = setup(store, ToggledComponent)

    expect(wrapper.html()).toBe(authenticatedHTML)
  })
  it("renders anonymous component when state doesnt match", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(null))

    const ToggledComponent = createToggledComponent({
      connect,
      path: isAuthenticatedState,
      components: {
        authenticated: AuthenticatedComponent,
        anonymous: AnonymousComponent
      }
    })

    const wrapper = setup(store, ToggledComponent)

    expect(wrapper.html()).toBe(anonymousHTML)
  })
})
