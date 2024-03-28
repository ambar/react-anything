import {useCallback, useEffect, useState} from 'react'

export const useStorageValue = (key: string, defaultValue = null) => {
  const [value, setValueInternal] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    return localStorage.getItem(key) ?? defaultValue
  })

  const setValue = useCallback((value: string | null) => {
    setValueInternal(prev => {
      const next = typeof value === 'function' ? value(prev) : value
      if (next == null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, next)
      }
      return next
    })
  }, [])

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === key) {
        setValueInternal(localStorage.getItem(key) ?? defaultValue)
      }
    }
    window.addEventListener('storage', listener)
    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [])

  return [value, setValue] as const
}
