type Nested<T> = T & { children: Nested<T>[] }

const depthFirstMergeWith = <
  T, R extends Record<string, unknown>
>(
  item: Nested<T>, callback: (item: Nested<T>) => R
): Nested<T & R> => {
  const children = item.children.map(child => depthFirstMergeWith(child, callback))
  return {
    ...item,
    children,
    ...callback({
      ...item,
      children,
    }),
  }
}

const getChildren = <T extends { children: T[] }>(item: T): T[] => {
  return [
    ...item.children,
    ...item.children.flatMap((child) => getChildren(child))
  ]
}

export { depthFirstMergeWith, getChildren }
