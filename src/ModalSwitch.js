import React from "react"
import PropTypes from "prop-types"

import { createModalSwitch } from "./createModalSwitch"

/**
 * A route that can be used for other routes.
 *
 * @param {object} props
 * @param {function} props.Switch
 * The Switch component to use.
 * @param {function} props.Route
 * The Route component to use.
 * @param {object} config
 * The config to generate routes from.
 * @param {function|bool} report
 * The function or boolean to enable reporting of route paths.
 *
 * @example
 * // routes.js
 * import { IndexPage } from "pages/index"
 * import { AboutPage } from "pages/about"
 *
 * export const config = {
 *   path: "/",
 *   Component: IndexPage,
 *   routes: [
 *     {path: "about", Component: AboutPage},
 *   ]
 * }
 *
 * // app.js
 * import React from "react"
 * import { Router, Route, Switch } from "react-router"
 * import { ModalSwitch } from "@alexseitsinger/react-router-components"
 *
 * import { config } from "./routes"
 *
 * function App() {
 *  return (
 *    <Router>
 *      <ModalSwitch
 *        Switch={Switch}
 *        Route={Route}
 *        config={config}
 *        report={true}
 *      />
 *    </Router>
 *  )
 * }
 */
export function ModalSwitch({
  Switch,
  Route,
  config,
  report = false
}) {
  const Component = createModalSwitch({
    Switch,
    Route,
    config,
    report,
  })
  return <Route component={Component} />
}

ModalSwitch.propTypes = {
  Switch: PropTypes.func.isRequired,
  Route: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  report: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
}
