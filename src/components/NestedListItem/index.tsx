import styles from "./index.module.css"


enum Status {
  NotSelected,
  Selected,
  ParentSelected,
}

const NestedListItem = ({
  label,
  isSelected,
  isParentSelected,
  canOpen,
  isOpen,
  nestedLevel = 0,
  highlight,
  toggleSelected,
  toggleOpen,
}: Props) => {
  const status = isSelected ? Status.Selected
    : isParentSelected ? Status.ParentSelected
    : Status.NotSelected

  let text: React.ReactElement[] = [<>{label}</>]
  const lowerCaseLabel = label.toLowerCase()
  console.log(highlight, lowerCaseLabel.includes(highlight as string))
  if (highlight && lowerCaseLabel.includes(highlight)) {
    text  = []
    let i = lowerCaseLabel.indexOf(highlight), j = 0
    do {
      i = lowerCaseLabel.indexOf(highlight, j)
      text.push(<>{label.slice(j, i)}</>)
      j = i + highlight.length
      text.push(<span className={styles.highlight}>{label.slice(i, j)}</span>)
    } while (label.indexOf(highlight, j) > -1)
    text.push(<>{label.slice(j)}</>)
  }

  return (
    <div
      onClick={toggleOpen}
      className={[
        styles.container,
        canOpen && styles.openableContainer,
      ].filter(Boolean).join(" ")}
      style={{ paddingLeft: ((nestedLevel + 1) * 16) + "px" }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
          if (status !== Status.ParentSelected) {
            toggleSelected()
          }
        }}
        className={[
          styles.status,
          status === Status.Selected && styles.statusSelected,
          status === Status.ParentSelected && styles.statusParentSelected,
        ].filter(Boolean).join(" ")}
      />
      <div>{text}</div>
      {canOpen && (
        <div
          className={[
            styles.open,
            !isOpen && styles.openClosed,
          ].filter(Boolean).join(" ")}
        />
      )}
    </div>
  )
}

interface Props {
  label: string
  isSelected: boolean
  isParentSelected?: boolean
  canOpen?: boolean
  isOpen?: boolean
  nestedLevel?: number
  highlight?: string
  toggleSelected: () => void
  toggleOpen: () => void
}

export default NestedListItem
