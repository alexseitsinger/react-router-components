export function removeDuplicateForwardSlashes(pathname) {
    return pathname.replace(/(\/)\/+/g, "$1")
}

export function setFullPath(basePath, config) {
  const fullPath = removeDuplicateForwardSlashes(`${basePath}/${config.path}`)
  config.path = fullPath
  if(config.routes) {
    config.routes.forEach(obj => {
      setFullPath(fullPath, obj)
    })
  }
}


