import ReactDOM from 'react-dom/client'
import {ColorSchemeProvider, getInlineColorSchemeScript} from '../src'
import {App} from './App'

const script = document.createElement('script')
script.textContent = getInlineColorSchemeScript()
document.head.prepend(script)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ColorSchemeProvider>
    <App />
  </ColorSchemeProvider>,
)
