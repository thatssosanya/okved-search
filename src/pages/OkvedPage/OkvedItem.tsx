import { shallow } from "zustand/shallow"
import NestedListItem from "../../components/NestedListItem"
import useOkvedStore from "../../data/okved/store"
import type { Item } from "../../data/okved/types"
import styles from "./index.module.css"

const OkvedItem = ({
  item,
  parentSelected,
  nestedLevel = 0,
}: Props) => {
  const {
    selectedIds,
    query,
    toggleOpen,
    toggleSelected,
  } = useOkvedStore(({ selectedIds, query, toggleOpen, toggleSelected }) => ({
    selectedIds, query, toggleOpen, toggleSelected,
  }), shallow)
  const isSelected = selectedIds.includes(item.id)

  return (!item.isActive ? null :
    <>
      <NestedListItem
        label={item.name}
        isSelected={isSelected}
        isParentSelected={parentSelected}
        canOpen={item.children.length > 0}
        isOpen={item.isOpen}
        nestedLevel={nestedLevel}
        highlight={query.toLowerCase()}
        toggleSelected={() => toggleSelected(item)}
        toggleOpen={() => toggleOpen(item.id)}
      />
      <div
        className={styles.itemChildrenContainer}
        // max height transition feels bad and is unreliable for large elements
        // could be reworked into a js animation
        style={{ maxHeight: item.isOpen ? "5000px" : 0 }}
      >
        {item.children.map((child) => (
          <OkvedItem
            item={child}
            parentSelected={parentSelected || isSelected}
            nestedLevel={nestedLevel + 1}
            key={child.name}
          />
        ))}
      </div>
    </>
  )
}

interface Props {
  item: Item
  parentSelected?: boolean
  nestedLevel?: number
}

export default OkvedItem
