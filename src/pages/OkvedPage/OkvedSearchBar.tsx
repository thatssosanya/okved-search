import SearchBar from "../../components/SearchBar"
import useOkvedStore from "../../data/okved/store"

const OkvedSearchBar = () => {
  return (
    <SearchBar useStore={useOkvedStore} placeholder="Search OKVEDs" />
  )
}

export default OkvedSearchBar
