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
  setBasePath("/", config)

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



export function reportRoutes(report, mainRoutes, modalRoutes){
  const mainRoutePaths = mainRoutes.map((route, i) => {
    const number = (i + 1)
    const path = route.props.path
    const exact = route.props.exact ? route.props.exact : false
    return `${number}) ${path}, ${exact}`
  }).join("\n  ")

  const modalRoutePaths = modalRoutes.map((route, i) => {
    const number = (i + 1)
    const path = route.props.path
    const exact = route.props.exact ? route.props.exact : false
    return `${number}) ${path}, ${exact}`
  }).join("\n  ")

  const message = [
    "[react-router-components]",
    "Main Routes",
    ("  " + (mainRoutePaths.length ? mainRoutePaths : "None")),
    "Modal Routes",
    ("  " + (modalRoutePaths.length ? modalRoutePaths : "None")),
  ].join("\n")

  if (report === true) {
    console.log(message)
  }
  else if (_.isFunction(report)){
    report(message)
  }
}

export function updateRoutes({
  config: {
    path,
    Component,
    routes,
    modal = false,
    exact = true,
    basePath,
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
    var prefix = removeDuplicateForwardSlashes(`/${basePath}/${route.basePath}`)
    if(!( routePath.startsWith(prefix))){
      routePath = removeDuplicateForwardSlashes(`${prefix}/${routePath}`)
    }

    if(routePath === "/*"){
      routePath = "*"
    }

    // If its a modal route, create it.
    // Them, add a corresponding main route.
    // Oterhwise, just make a main route.
    if(route.modal && route.modal === true) {
      modalRoutes.push(composeRoute({
        path: routePath,
        Component: route.Component,
        rootProps,
        exact: true,
        Route,
      }))
      mainRoutes.push(composeRoute({
        path: routePath,
        Component,
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

export function setBasePath(basePath, config) {
  config.basePath = basePath
  if(config.routes) {
    config.routes.forEach(obj => {
      setBasePath(config.path, obj)
    })
  }
}


