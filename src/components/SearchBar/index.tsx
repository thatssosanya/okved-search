import { useState } from "react"
import useDebounce from "../../features/hooks/useDebounce"
import styles from "./index.module.css"

const SearchBar = ({ useStore, placeholder = "Search" }: Props) => {
  const [query, setQuery] = useState("")
  const _setStoredQuery = useStore(({ setQuery }) => setQuery)
  const setStoredQuery = useDebounce(_setStoredQuery, 300)

  return (
    <input
      placeholder={placeholder}
      value={query}
      onChange={(e) => {
        const v = e.target.value
        setQuery(v)
        setStoredQuery(v)
      }}
      className={styles.searchBar}
    />
  )
}

interface Props {
  useStore: (selector: (state: StoreState) => SetQuery) => SetQuery
  placeholder?: string
}

interface StoreState {
  setQuery: SetQuery
}

type SetQuery = (query: string) => void

export default SearchBar
