import React from "react"
import _ from "underscore"

export function getStateValue(state, key, bits) {
  var obj = state
  bits.forEach(bit => {
    obj = obj[bit]
  })
  return obj[key]
}

export function composeRoute({ path, Component, rootProps, exact = true, Route }) {
  return (
    <Route
      key={`route${_.uniqueId()}`}
      path={path}
      exact={exact}
      render={(routeProps) => <Component {...rootProps} {...routeProps} />}
    />
  )
}

export function generateRoutes({ config, rootProps, Route }){
  // Sort our route into two arrays.
  const mainRoutes = []
  const modalRoutes = []

  // Set the parents on each config object so we can build the paths easily.
  setRuntimeConfig({
    config,
    parentConfig: config,
  })

  // Create the routes for the config.
  updateRoutes({ config, rootProps, mainRoutes, modalRoutes, Route })

  // Remove the wildcard route to the bottom of the list.
  mainRoutes.forEach((route, i) => {
    if(route.props.path === "*"){
      mainRoutes.push(mainRoutes.splice(i, 1)[0])
    }
  })

  // Return them for use in the composed component.
  return {
    mainRoutes,
    modalRoutes,
  }
}


function createRoutesReport(routes) {
  return routes.map((route) => {
    const path = route.props.path
    const exact = route.props.exact ? route.props.exact : false
    return "  " + path + ", " + exact
  }).join("\n")
}


export function reportRoutes(report, mainRoutes, modalRoutes){
  const mainRoutesReport = createRoutesReport(mainRoutes)
  const modalRoutesReport = createRoutesReport(modalRoutes)
  const message = [
    "[react-router-components]",
    "Main Routes",
    (mainRoutesReport.length ? mainRoutesReport : "  None"),
    "Modal Routes",
    (modalRoutesReport.length ? modalRoutesReport : "  None"),
  ].join("\n")

  if (report === true) {
    console.log(message)
  }
  else if (_.isFunction(report)){
    report(message)
  }
}

function getFirstNonModalParentConfig(config) {
  var pc = config.parentConfig
  if(!pc.modal || pc.modal && pc.modal === false) {
    return pc
  }
  if(pc.modal && pc.modal === true) {
    return getFirstNonModalParentConfig(pc)
  }
}

export function updateRoutes({
  config: {
    path,
    Component,
    routes,
    modal = false,
    exact = true,
    parentConfig,
  },
  rootProps,
  mainRoutes,
  modalRoutes,
  Route
}) {
  // Add the index route
  if(path === "/"){
    mainRoutes.push(composeRoute({ path, Component, rootProps, exact, Route }))
  }

  // If there are no subroutes, return.
  if(!routes || !routes.length) {
    return
  }

  // If there are sub-routes, iterate over them, and add any we find.
  routes.forEach((route) => {
    // If it's a wildcard path, fix it.
    var routePath = route.path
    var prefix = removeDuplicateForwardSlashes(`/${parentConfig.path}/${route.parentConfig.path}`)
    if(!( routePath.startsWith(prefix))){
      routePath = removeDuplicateForwardSlashes(`${prefix}/${routePath}`)
    }

    if(routePath === "/*"){
      routePath = "*"
    }

    if(route.modal && route.modal === true) {
      // Create a modal route that renders the modal.
      modalRoutes.push(composeRoute({
        path: routePath,
        Component: route.Component,
        rootProps,
        exact: true,
        Route,
      }))

      // Create a main route that renders the background page when the modal is
      // open.
      //
      mainRoutes.push(composeRoute({
        path: routePath,
        Component: getFirstNonModalParentConfig(route).Component,
        rootProps,
        exact: true,
        Route,
      }))
    }
    else {
      mainRoutes.push(composeRoute({
        path: routePath,
        Component: route.Component,
        rootProps,
        exact: routePath === "*" ? false : true,
        Route,
      }))
    }

    // Repeat this process for each route object also.
    updateRoutes({ config: route,  rootProps, mainRoutes, modalRoutes, Route })
  })
}

export function removeDuplicateForwardSlashes(pathname) {
    return pathname.replace(/(\/)\/+/g, "$1")
}

export function setRuntimeConfig({ config, parentConfig }) {
  // Set the options for this config.
  config.parentConfig = parentConfig

  // If there are routes, set the options for each one of them as well.
  if(config.routes) {
    config.routes.forEach(route => {
      setRuntimeConfig({
        config: route,
        parentConfig: config,
      })
    })
  }
}


