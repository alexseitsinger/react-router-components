import React from "react"
import { Redirect } from "react-router-dom"
import { getStateValue } from "./utils"

/**
 * Returns a connected component that redirects if the state isnt truthy.
 *
 * @param {object} config
 * @param {object} config.component
 * The component to render if the state is truthy.
 * @param {string} config.path
 * The path to the reducer state key we want to check for truthiness.
 * @param {function} config.connect
 * The connect function to use for connecting to redux.
 * @param {string} config.url
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
 *   component: SettingsPage,
 *   path: "authentication.isAuthenticated",
 *   url: "/",
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
  path,
  component,
  url = "/",
}){
  // Convert the custom component to capitlaized so we can use it in JSX.
  const ActualComponent = component

  // Split the state target into parts so we can get its nested value.
  const bits = path.split(".")
  const key = bits.pop()

  if (!( key )) {
    throw new Error("There was no key found from the state path provided to createRedirectedComponent.")
  }

  // Create a component to wrap the real component with.
  function RedirectedComponent(props) {
    if(key in props && props[key] === true){
      return <ActualComponent {...props} />
    }
    return <Redirect to={url} />
  }

  // Map the target state to this HOC, so we can use the state.
  const mapState = state => ({
    [key]: getStateValue(state, key, bits),
  })

  // Return the connected HOC.
  return connect(mapState)(RedirectedComponent)
}
