import React from "react"
import equals from "shallow-equals"

import { generateRoutes, reportRoutes } from "./utils"

let created = []

/**
 * Creates a stateless functional component for use in the root route. Routes that are marked with `modal: true` are rendered WITH their parent route component.
 *
 * @param {object} options An object of route configurations.
 * @param {object} options.Switch
 * The Switch component to use
 * @param {function} options.Route
 * The Route component to use for each route.
 * @param {object} options.config
 * The routes config object to generate routes from.
 * @param {function|boolean} options.report
 * The function or boolean to toggle route reports.
 *
 * @returns {function} A stateless functional component to be used as the root route.
 *
 * @example
 * import React from "react"
 * import { Router, Route, Switch } from "react-router"
 * import { createModalSwitch }  from "@alexseitsinger/react-router-components"
 *
 * import LandingPage from "./pages/landing"
 * import AboutPage from "./pages/about"
 * import AboutModalPage from "./pages/about-modal"
 * import NotFoundPage from "./pages/not-found"
 *
 * const config = {
 *   path: "/",
 *   Component: LandingPage,
 *   routes: [
 *     {path: "*", Component: NotFoundPage},
 *     {path: "about", Component: AboutPage, routes: [
 *       {path: "modal", Component: AboutModalPage, modal: true},
 *     ]}
 *   ]
 * }
 *
 * function App(props) {
 *   const ModalSwitch = createModalSwitch({ Switch, Route, config })
 *   return (
 *     <Router>
 *       <Layout>
 *         <Route component={ModalSwitch} />
 *       </Layout>
 *     </Router>
 *   )
 * }
 *
 * export default App
 */
export function createModalSwitch({ Switch, Route, config, report = false }) {
  return function ModalSwitch(routeProps) {
    var target

    created.forEach(obj => {
      if (equals(obj.config, config)) {
        target = obj
      }
    })

    if (!target) {
      target = {
        config,
        routes: generateRoutes({ config, routeProps, Route }),
      }
      created.push(target)
    }

    // Extract the routes.
    const { mainRoutes, modalRoutes } = target.routes

    // Report the routes
    reportRoutes(report, mainRoutes, modalRoutes)

    // Render the routes.
    return (
      <React.Fragment>
        <Switch>
          {mainRoutes}
        </Switch>
        <Switch>
          {modalRoutes}
        </Switch>
      </React.Fragment>
    )
  }
}
