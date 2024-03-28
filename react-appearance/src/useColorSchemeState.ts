import {useCallback, useEffect, useState} from 'react'
import {useMediaQuery} from './useMediaQuery'
import {useStorageValue} from './useStorageValue'
import {useHandler} from './useHandler'

type Nullable<T> = T | null | undefined

type InlineScriptOptions = Pick<Options, 'storageKey' | 'colorScheme'> & {
  /**
   * The classes to toggle based on the color scheme
   * @default [undefined, 'dark']
   */
  classes?: [Nullable<string>, Nullable<string>]
}

/**
 * Add to the head to set the color scheme, should be injected into both development and production modes
 */
export const getInlineColorSchemeScript = ({
  storageKey = 'theme',
  classes: [lightClass, darkClass] = [undefined, 'dark'],
  colorScheme,
}: InlineScriptOptions = {}) =>
  `(({storageKey,lightClass,darkClass,colorScheme})=>{
  const saved = localStorage.getItem(storageKey)
  const matchesDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = colorScheme ? colorScheme === 'dark' : !saved || saved === 'auto' ? matchesDark : saved === 'dark'
  if (lightClass) document.documentElement.classList.toggle(lightClass, !isDark)
  if (darkClass) document.documentElement.classList.toggle(darkClass, isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
})(${JSON.stringify({storageKey, lightClass, darkClass, colorScheme})});`
    .replace(/\n/g, ';')
    .replace(/\s{2,}/g, '')

// Value to be used
export type ColorScheme = 'light' | 'dark'
// Value to be stored
type ConfigValue = ColorScheme | 'auto'

const sanitize = (value: string | null): ConfigValue => {
  return value && ['light', 'dark', 'auto'].includes(value)
    ? (value as ConfigValue)
    : 'auto'
}

export type Options = {
  /**
   * The key to use in localStorage
   * @default 'theme'
   */
  storageKey?: string
  /**
   * The default color scheme to use when the user hasn't set a preference
   * @default 'light'
   */
  defaultColorScheme?: ColorScheme
  /**
   * Override the color scheme with a hardcoded value, defaults to the system's preference
   */
  colorScheme?: ColorScheme
}

/**
 * Control the color scheme of the app, with support for system preferences and localStorage.
 * Should be used in the root provider of the app.
 */
export const useColorSchemeState = ({
  storageKey = 'theme',
  defaultColorScheme = 'light',
  colorScheme: hardcodedColorScheme,
}: Options = {}) => {
  const matchesDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [storedTheme, setStoredTheme] = useStorageValue(storageKey)

  const getPreferredTheme = useHandler(() => {
    const sanitized = sanitize(storedTheme)
    return sanitized === 'auto' ? (matchesDark ? 'dark' : 'light') : sanitized
  })

  const [colorScheme, setColorSchemeInternal] = useState<ColorScheme>(() => {
    if (hardcodedColorScheme) {
      return hardcodedColorScheme
    }
    if (typeof window === 'undefined') {
      return defaultColorScheme
    }
    return getPreferredTheme()
  })
  const setColorScheme = useHandler(
    (value: ColorScheme, storeValue: ConfigValue = value) => {
      if (hardcodedColorScheme) {
        return
      }
      document.documentElement.classList.toggle('dark', value === 'dark')
      document.documentElement.style.colorScheme = value
      setColorSchemeInternal(value)
      setStoredTheme(storeValue)
      setSkipEffect(true)
    },
  )

  // Skip the first effect on mount or when the theme is newly set
  const [skipEffect, setSkipEffect] = useState(true)
  useEffect(() => {
    void skipEffect
    setSkipEffect(false)
  }, [skipEffect])

  // Update the theme when the localStorage changes
  useEffect(() => {
    if (skipEffect) {
      return
    }
    setColorScheme(getPreferredTheme(), sanitize(storedTheme))
  }, [storedTheme])

  // Update the theme when the OS theme changes
  useEffect(() => {
    if (skipEffect) {
      return
    }
    setColorScheme(matchesDark ? 'dark' : 'light', 'auto')
  }, [matchesDark])

  return [colorScheme, setColorScheme] as const
}
