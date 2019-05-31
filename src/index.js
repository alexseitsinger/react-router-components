import "core-js/stable"
import React from "react"
import { connect } from "react-redux"

export function createToggledComponent({
  components: { anonymous, authenticated },
  reducer: { name = "auth", key = "isAuthenticated" }
}){
  function ToggledComponent(props) {
    if(reducer.key && props[reducer.key] === true){
      return <authenticated {...props} /> 
    }
    return <anonymous {...props} />
  }

  const mapState = (state) => ({
    [reducer.key]: state[reducer.name][reducer.key]
  })

  const ConnectedToggledComponent = connect(mapState)(ToggledComponent)

  return ConnectedToggledComponent
}
