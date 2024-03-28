import ReactDOM from 'react-dom/client'
import {App} from './App'
import {ColorSchemeProvider, getInlineColorSchemeScript} from '../src'

const script = document.createElement('script')
script.textContent = getInlineColorSchemeScript()
document.head.prepend(script)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ColorSchemeProvider>
    <App />
  </ColorSchemeProvider>,
)
