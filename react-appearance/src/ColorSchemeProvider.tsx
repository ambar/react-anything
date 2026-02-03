import {createContext, useContext, useMemo} from 'react'
import {useColorSchemeState} from './useColorSchemeState'

export const ColorSchemeContext = createContext<
  ReturnType<typeof useColorSchemeState>
>([] as unknown as ReturnType<typeof useColorSchemeState>)

export const useColorScheme = () => {
  return useContext(ColorSchemeContext)[0]
}

export type ColorSchemeProviderProps = {
  children: React.ReactNode
} & Parameters<typeof useColorSchemeState>[0]

export const ColorSchemeProvider = ({
  children,
  ...props
}: ColorSchemeProviderProps) => {
  const [themeValue, setThemeValue, colorScheme] = useColorSchemeState(props)
  return (
    <ColorSchemeContext.Provider
      value={useMemo(
        () => [themeValue, setThemeValue, colorScheme],
        [themeValue, setThemeValue, colorScheme],
      )}
    >
      {children}
    </ColorSchemeContext.Provider>
  )
}
