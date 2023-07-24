interface OkvedStore {
  items: Item[]
  selectedIds: number[]
  query: string
  toggleOpen: (id: number) => void
  toggleSelected: (item: Item) => void
  setQuery: (query: string) => void
}

interface Item {
  id: number
  name: string
  searchableName: string
  children: Item[]
  isActive: boolean
  isOpen: boolean
}

export type { OkvedStore, Item }
