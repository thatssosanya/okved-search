import OkvedItem from "./OkvedItem"
import OkvedSearchBar from "./OkvedSearchBar"
import useOkvedStore from "../../data/okved/store"
import styles from "./index.module.css"

const OkvedPage = () => {
  const items = useOkvedStore(({ items }) => items)
  return (
    <div className={styles.container}>
      <OkvedSearchBar />
      <div>
        {items.map((item) => (
          <OkvedItem item={item} key={item.name} />
        ))}
      </div>
    </div>
  )
}

export default OkvedPage
