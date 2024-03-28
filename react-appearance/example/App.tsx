import {useContext} from 'react'
import {ColorSchemeContext} from '../src'

export function App() {
  const [colorScheme, setColorScheme] = useContext(ColorSchemeContext)

  return (
    <>
      <h1>Vite + React</h1>
      <div>
        <button
          type="button"
          onClick={() =>
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
          }
        >
          colorScheme is {colorScheme}
        </button>
        <p
          style={{
            color: 'light-dark(lightgreen, lightcoral)',
          }}
        >
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}
