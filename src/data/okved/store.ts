import { create } from "zustand"
import type { OkvedStore } from "./types"
import items from "./items.json"
import { getChildren, depthFirstMergeWith } from "../../features/children"

const storedSelectedIdsJson = localStorage.getItem("selectedIds")
const storedSelectedIds = storedSelectedIdsJson ? JSON.parse(storedSelectedIdsJson) : []

const useOkvedStore = create<OkvedStore>((set) => ({
  items: items.map((rootItem) => depthFirstMergeWith(rootItem, (item) => {
    const children = getChildren(item)
    return {
      searchableName: item.name.toLowerCase(),
      isActive: true,
      isOpen: children.some((child) => storedSelectedIds.includes(child.id)),
    }
  })),
  selectedIds: storedSelectedIds,
  query: "",
  toggleSelected: (item) => set(({ selectedIds }) => {
    const i = selectedIds.indexOf(item.id)
    let result: number[] = []
    if (i > -1) {
      result = [
        ...selectedIds.slice(0, i),
        ...selectedIds.slice(i + 1),
      ]
    } else {
      result = [
        ...selectedIds,
        item.id,
      ]
      const childIds = getChildren(item).map((child) => child.id)
      result = result.filter((id) => !childIds.includes(id))
    }
    localStorage.setItem("selectedIds", JSON.stringify(result))
    return {
      selectedIds: result,
    }
  }),
  toggleOpen: (id) => set(({ items }) => {
    return {
      items: items.map((rootItem) => depthFirstMergeWith(rootItem, (item) => {
        return {
          isOpen: item.id === id ? !item.isOpen : item.isOpen
        }
      }))
    }
  }),
  setQuery: (query) => set(({ items }) => {
    if (query === "") {
      return {
        query,
        items: items.map((rootItem) => depthFirstMergeWith(rootItem, (item) => {
          const children = getChildren(item)
          return {
            isActive: true,
            isOpen: children.some((child) => storedSelectedIds.includes(child.id)),
          }
        }))
      }
    }
    const lowerCaseQuery = query.toLowerCase()
    return {
      query,
      items: items.map((rootItem) => depthFirstMergeWith(rootItem, (item) => {
        const children = getChildren(item)
        const hasActiveChildren = children.some((child) => child.isActive)
        return {
          isActive: hasActiveChildren
            || item.searchableName.includes(lowerCaseQuery),
          isOpen: hasActiveChildren,
        }
      }))
    }
  }),
}))

export default useOkvedStore
