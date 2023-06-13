const nextElementInList = (list, currentElement) => {
  const currentElementIndex = list.indexOf(currentElement)
  const nextElementIndex = (currentElementIndex + 1) % list.length
  return list[nextElementIndex]
}

export default nextElementInList
