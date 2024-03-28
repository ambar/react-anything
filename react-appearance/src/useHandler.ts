import {useRef} from 'react'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useHandler = <T extends (...args: any[]) => any>(handler: T) => {
  const handlerRef = useRef<T>(handler)
  handlerRef.current = handler
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return useRef(((...args: any[]) => handlerRef.current(...args)) as T).current
}
