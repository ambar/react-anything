import {useCallback, useEffect, useRef, useState} from 'react'

/**
 * Read/update the value in localStorage, and keeping it in sync with other tabs.
 */
export const useStorageValue = (key: string, defaultValue = null) => {
  const changeType = useRef<'event' | 'set'>('set')
  const [value, setValueInternal] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    return localStorage.getItem(key) ?? defaultValue
  })

  const setValue: typeof setValueInternal = useCallback(
    value => {
      changeType.current = 'set'
      setValueInternal(prev => {
        const next = typeof value === 'function' ? value(prev) : value
        if (next == null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, next)
        }
        return next
      })
    },
    [key],
  )

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === key) {
        changeType.current = 'event'
        setValueInternal(localStorage.getItem(key) ?? defaultValue)
      }
    }
    window.addEventListener('storage', listener)
    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key, defaultValue])

  return [value, setValue, changeType.current] as const
}
