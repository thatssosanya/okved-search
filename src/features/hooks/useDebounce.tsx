import { useEffect, useRef } from "react"

const useDebounce = <T extends any[]>(callback: (...args: T) => any, time: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const clear = () => {
    clearTimeout(timeout.current)
  }
  useEffect(() => clear, [])
  return (...args: T) => {
    clear()
    timeout.current = setTimeout(() => callback(...args), time)
  }
}

export default useDebounce
