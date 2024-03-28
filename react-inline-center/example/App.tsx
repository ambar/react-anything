import * as mdi from 'md.icons'
import InlineCenter from '../src'

export default function App() {
  return (
    <>
      <button>
        <InlineCenter>
          <img
            src="https://api.iconify.design/ri/account-box-line.svg?height=none&color=%23000&box=1"
            width={48}
            height={48}
            alt="icon"
          />
        </InlineCenter>
        label
      </button>
      <p>
        <InlineCenter>
          <img
            src="https://placehold.co/64x64?text=X"
            width={48}
            height={48}
            alt="placeholder"
          />
        </InlineCenter>
        text.
      </p>
    </>
  )
}
