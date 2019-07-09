import _ from "underscore"

export function reportRoutes(report, mainRoutes, modalRoutes){
  const isNotProduction = (process.env.NODE_ENV !== "production")

  if(isNotProduction) {
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
}
