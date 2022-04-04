export const formatId = (id) => {
  const additionalZero = id.length === 1 ? '00' : id.length === 2 ? '0' : ''
  return `${additionalZero}${id}`
}
