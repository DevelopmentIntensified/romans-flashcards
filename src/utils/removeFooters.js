const removeFooters = (v) => {
  return v.replace(/(\[[0-9]+\])|[\n\s]+/g,"")
}

export default removeFooters