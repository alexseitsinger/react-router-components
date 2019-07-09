export function getStateValue(state, bits) {
  var currentObj = state
  bits.forEach(bit => {
    currentObj = currentObj[bit]
  })
  return currentObj[key]
}

