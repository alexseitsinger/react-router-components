import React from "react"

import { updateRoutes } from "./updateRoutes"
import { setFullPath } from "./utils"

export function generateRoutes({ config, rootProps, Route }){
  // Sort our route into two arrays.
  const mainRoutes = []
  const modalRoutes = []

  // Set the parents on each config object so we can build the paths easily.
  setFullPath("/", config)

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


