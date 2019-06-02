import React from "react"


/**
 * @description Returns a connected component that renders another component based on the state.
 * @param {Object} components The Anonymous and Authenticated components to use for rendering.
 * @param {Object} reducer The reducer state name and state key to use for toggling.
 * @param {Function} connect The connect function to use for connecting to redux.
 * @return {Function} A connected component that has some state mapped for toggling.
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
 *   components: {
 *      Authenticated: HomePage,
 *      Anonymous: LandingPage,
 *   },
 *   reducer: {
 *      name: "auth",
 *      key: "isAuthenticated",
 *   }
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
  reducer: { name, key },
  connect,
}){
  function ToggledComponent(props) {
    var Component = Anonymous
    if(key && key in props && props[key] === true){
        Component = Authenticated 
    }
    return <Component {...props} />
  }

  const mapState = (state) => ({
    [key]: state[name][key]
  })

  return connect(mapState)(ToggledComponent)
}
