export function getStateValue(state, key, bits) {
  var obj = state
  bits.forEach(bit => {
    obj = obj[bit]
  })
  return obj[key]
}

