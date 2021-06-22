const upperCaseChName = (n) => {
  if(n.charAt(0).match(/[0-9]/g)){
    return n.charAt(1).toUpperCase()+" "+n.slice(1)
  } else {
    return n.charAt(0).toUpperCase()+n.slice(1)
  }
}
export default upperCaseChName