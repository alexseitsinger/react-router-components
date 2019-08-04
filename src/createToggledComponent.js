import React from "react"
import { getStateValue } from "./utils"

/**
 * Returns a connected component that renders another component based on the
 * state.
 *
 * @param {object} config
 * @param {object} config.components
 * @param {function} config.components.authenticated
 * The component to render when the state is truthy.
 * @param {function} config.components.anonymous
 * The component to render when the state is not truthy.
 * @param {string} config.path
 * The path to the reducer state key we want to check for truthiness.
 * @param {function} config.connect
 * The connect function to use for connecting to redux.
 *
 * @return {function}
 * A connected component that has some state mapped for toggling.
 *
 * @example
 * import React from "react"
 * import { Provider, connect } from "react-redux"
 * import { Router, Route } from "react-router"
 * import { createToggledComponent } from "@alexseitsinger/react-router-components"
 *
 * import HomePage from "./pages/home"
 * import LandingPage from "./pages/landing"
 *
 * const ToggledIndex = createToggledComponent({
 *   connect,
 *   path: "authentication.isAuthenticated",
 *   components: {
 *      authenticated: HomePage,
 *      anonymous: LandingPage,
 *   },
 * })
 *
 * function App(props) {
 *   return (
 *     <Provider store={store}>
 *       <Router>
 *         <Route path={"/"} component={ToggledIndex} exact />
 *       </Router>
 *     </Provider>
 *   )
 * }
 *
 * export default App
 */
export function createToggledComponent({
  connect,
  path,
  components: { anonymous, authenticated },
}){
  // Conver the components to capitalized for use in JSX.
  const AuthenticatedComponent = authenticated
  const AnonymousComponent = anonymous

  // Split the path into its parts for iteration.
  const bits = path.split(".")
  const key = bits.pop()

  if (!( key )) {
    throw new Error("There was no key found from the state path passed to createToggledComponent.")
  }

  // Create a HOC to wrap the actual components.
  function ToggledComponent(props) {
    if(key in props && props[key] === true){
      return <AuthenticatedComponent {...props} />
    }
    return <AnonymousComponent {...props} />
  }

  // Map the state to this HOC.
  const mapState = state => ({
    [key]: getStateValue(state, key, bits)
  })

  // Return the HOC connected tot redux store.
  return connect(mapState)(ToggledComponent)
}
