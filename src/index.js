import "core-js/stable"
import React from "react"
import { connect } from "react-redux"

export function createToggledComponent({
<<<<<<< Updated upstream
  components: { anonymous, authenticated },
=======
  components: { Anonymous, Authenticated },
>>>>>>> Stashed changes
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

  const ConnectedToggledComponent = connect(mapState)(ToggledComponent)

  return ConnectedToggledComponent
}
