import React from "react"
import { getStateValue } from "./utils"

/**
 * Returns a connected component that renders another component based on the
 * state.
 *
 * @param {object} config
 * @param {object} config.components
 * @param {function} config.components.Authenticated
 * The component to render when the state is truthy.
 * @param {function} config.components.Anonymous
 * The component to render when the state is not truthy.
 * @param {string} config.state
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
 * import { createToggledComponent } from "@alexseitsinger/react-toggled-component"
 *
 * import HomePage from "./pages/home"
 * import LandingPage from "./pages/landing"
 *
 * const ToggledIndex = createToggledComponent({
 *   connect,
 *   state: "core.authentication.isAuthenticated",
 *   components: {
 *      Authenticated: HomePage,
 *      Anonymous: LandingPage,
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
  components: { Anonymous, Authenticated },
  state,
  connect,
}){
  const bits = state.split(".")
  const key = bits.pop()

  function ToggledComponent(props) {
    if(key && key in props && props[key] === true){
      return <Authenticated {...props} />
    }
    return <Anonymous {...props} />
  }

  const mapState = state => ({
    [key]: getStateValue(state, key, bits)
  })

  return connect(mapState)(ToggledComponent)
}
