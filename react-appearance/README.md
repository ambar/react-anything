# react-appearance

The Color Scheme API for React applications:
- Detect the user's color scheme preference and react to changes in it
- Listen to changes in the local storage and update the color scheme accordingly, keep in sync with multiple tabs
- Set the `color-scheme` on the root element to enable CSS media queries and `light-dark()` CSS function

[![npm version](https://badgen.net/npm/v/react-appearance)](https://www.npmjs.com/package/react-appearance)

## Install

```
npm install react-appearance
```

## Usage

Add the `ColorSchemeProvider` to the root of your app:

```tsx
import {ColorSchemeProvider} from 'react-appearance'

render(
  <ColorSchemeProvider>
    <App />
  </ColorSchemeProvider>
)

type ColorScheme = 'light' | 'dark'
type ColorSchemeProviderProps = {
  children: ReactNode,
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
```

And the `getInlineColorSchemeScript` to the head of your document.

```tsx
import {getInlineColorSchemeScript} from 'react-appearance'

render(
  <head>
    <script dangerouslySetInnerHTML={{__html: getInlineColorSchemeScript(opts: InlineScriptOptions)}} />
  </head>
)

type InlineScriptOptions = Pick<ColorSchemeProviderProps, 'storageKey' | 'colorScheme'> & {
  /**
   * The classes to toggle based on the color scheme
   * @default [undefined, 'dark']
   */
  classes?: [Nullable<string>, Nullable<string>]
}
```

Access the color scheme in your components:

```tsx
import {ColorSchemeContext, useColorScheme} from 'react-appearance'

const [colorScheme, setColorScheme] = useContext(ColorSchemeContext)
const colorScheme = useColorScheme()
```
