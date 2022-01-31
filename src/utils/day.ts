export const dayRender = (value:Date) => {
  if (value.getMonth() < 10) {
      return 0 + (value.getMonth() + 1).toString()
  } else {
     return value.getMonth()+1
  }
}