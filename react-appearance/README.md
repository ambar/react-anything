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

```jsx
import {ColorSchemeProvider} from 'react-appearance'

render(
  <ColorSchemeProvider>
    <App />
  </ColorSchemeProvider>
)
```

And the `getInlineColorSchemeScript` to the head of your document.

```jsx
import {getInlineColorSchemeScript} from 'react-appearance'

render(
  <head>
    <script dangerouslySetInnerHTML={{__html: getInlineColorSchemeScript()}} />
  </head>
)
```

Access the color scheme in your components:

```jsx
import {ColorSchemeContext, useColorScheme} from 'react-appearance'

const [colorScheme, setColorScheme] = useContext(ColorSchemeContext)
const colorScheme = useColorScheme()
```
