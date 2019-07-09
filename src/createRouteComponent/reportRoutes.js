export function reportRoutes(isEnabled, mainRoutes, modalRoutes){
  const isNotProduction = (process.env.NODE_ENV !== "production")

  if(isEnabled && isNotProduction){
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

    console.log(message)
  }
}
