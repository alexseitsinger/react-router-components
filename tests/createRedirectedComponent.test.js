import React from "react"
import { Provider, connect } from "react-redux"
import { MemoryRouter, Route } from "react-router"

import { createRedirectedComponent } from "../src"
import {
  setAuthenticated,
  isAuthenticatedState,
  createStore,
} from "./redux"

function LandingPage(props){
  return (<div>Landing Page</div>)
}

const landingPageHTML = "<div>Landing Page</div>"

function SettingsPage(props) {
  return (<div>Settings Page</div>)
}

const settingsPageHTML = "<div>Settings Page</div>"

function setup(store, url, Component) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[url]}>
        <Route path={"/"} component={LandingPage} exact />
        <Route path={"/settings"} component={Component} exact />
      </MemoryRouter>
    </Provider>
  )
}

const settingsPageURL = "/settings"

describe("createRedirectedComponent", () => {
  it("redirects to / and renders <LandingPage /> for /settings when not authenticated and no url is passed.", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(false))

    const RedirectedComponent = createRedirectedComponent({
      connect,
      target: isAuthenticatedState,
      Component: SettingsPage,
    })

    const wrapper = setup(store, settingsPageURL, RedirectedComponent)

    expect(wrapper.html()).toBe(landingPageHTML)
  })
  it("redirects to / and renders <LandingPage /> for /settings when not authenticated.", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(false))

    const RedirectedComponent = createRedirectedComponent({
      connect,
      target: isAuthenticatedState,
      Component: SettingsPage,
      url: "/",
    })

    const wrapper = setup(store, settingsPageURL, RedirectedComponent)

    expect(wrapper.html()).toBe(landingPageHTML)
  })
  it("renders settings page when authenticated", () => {
    const store = createStore()

    store.dispatch(setAuthenticated(true))

    const RedirectedComponent = createRedirectedComponent({
      connect,
      target: isAuthenticatedState,
      Component: SettingsPage,
      url: "/",
    })

    const wrapper = setup(store, settingsPageURL, RedirectedComponent)

    expect(wrapper.html()).toBe(settingsPageHTML)
  })
})
