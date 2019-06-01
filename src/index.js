import "core-js/stable"
import React from "react"
import { connect } from "react-redux"

export function createToggledComponent({
  components: { Anonymous, Authenticated },
  reducer: { name, key }
}){
  function ToggledComponent(props) {
    if(key && key in props && props[key] === true){
      return <Authenticated {...props} /> 
    }
    return <Anonymous {...props} />
  }
  const mapState = (state) => ({
    [key]: state[name][key]
  })
  return connect(mapState)(ToggledComponent)
}
