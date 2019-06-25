import React from "react"


/**
 * Returns a connected component that renders another component based on the
 * state.
 *
 * @param {Object} components
 * The Anonymous and Authenticated components to use for rendering.
 * @param {Object} state
 * The path to the reducer state key we want to check for truthiness.
 * @param {Function} connect
 * The connect function to use for connecting to redux.
 *
 * @return {Function}
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

  const getStateValue = (stateObj) => {
    var currentObj = stateObj
    bits.forEach(bit => {
      currentObj = currentObj[bit]
    })
    return currentObj[key]
  }

  const mapState = state => ({
    [key]: getStateValue(state)
  })

  return connect(mapState)(ToggledComponent)
}
