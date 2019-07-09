import React from "react"
import { Redirect } from "react-router-dom"
import { getStateValue } from "./utils"

/**
 * Returns a connected component that redirects if the state isnt truthy.
 *
 * @param {object} config
 * @param {object} config.Component
 * The component to render if the state is truthy.
 * @param {string} config.state
 * The path to the reducer state key we want to check for truthiness.
 * @param {function} config.connect
 * The connect function to use for connecting to redux.
 * @param {string} config.redirect
 * The pathname to redirect to if state isn't truthy.
 *
 * @return {function}
 * A connected component that has some state mapped.
 *
 * @example
 * import React from "react"
 * import { Provider, connect } from "react-redux"
 * import { Router, Route } from "react-router"
 * import { createRedirectedComponent } from "@alexseitsinger/react-router-components"
 *
 * import SettingsPage from "pages/settings"
 * import LandingPage from "pages/landing"
 *
 * const RedirectedSettingsPage = createRedirectedComponent({
 *   connect,
 *   Component: SettingsPage,
 *   state: "core.authentication.isAuthenticated",
 *   redirect: "/",
 * })
 *
 * function App(props) {
 *   return (
 *     <Provider store={store}>
 *       <Router>
 *         <Route path={"/"} component={LandingPage} exact />
 *         <Route path={"/settings"} component={RedirectedSettingsPage} exact />
 *       </Router>
 *     </Provider>
 *   )
 * }
 *
 * export default App
 */
export function createRedirectedComponent({
  connect,
  Component,
  state,
  url = "/",
}){
  const bits = state.split(".")
  const key = bits.pop()

  function RedirectedComponent(props) {
    if(key && key in props && props[key] === true){
      return <Component {...props} />
    }
    return <Redirect to={url} />
  }

  const mapState = state => ({
    [key]: getStateValue(state, key, bits),
  })

  return connect(mapState)(RedirectedComponent)
}
