export function copyArray<T>(array: T): T {
  return JSON.parse(JSON.stringify(array))
}

export function __immutableSplice<T>(
  array: T,
  startFrom: number,
  deleteCount: number,
  newData?: Record<string, never>,
): T {
  const newArray = JSON.parse(JSON.stringify(array))

  if (newData) {
    newArray.splice(startFrom, deleteCount, newData)
  } else {
    newArray.splice(startFrom, deleteCount)
  }

  return newArray
}
