export function removeDuplicateForwardSlashes(pathname) {
    return pathname.replace(/(\/)\/+/g, "$1")
}

export function setFullPath(basePath, config) {
  config.basePath = basePath
  if(config.routes) {
    config.routes.forEach(obj => {
      setFullPath(config.path, obj)
    })
  }
}


