import InlineCenter from '../src'

export default function App() {
  return (
    <>
      <button style={{accentColor: 'auto'}}>
        <InlineCenter>
          <img
            src="https://api.iconify.design/ri/account-box-line.svg?height=none&color=%23000&box=1"
            width={36}
            height={36}
            alt="icon"
          />
        </InlineCenter>
        label
      </button>
      <p>
        <InlineCenter>
          <img
            src={placeholder(48,48)}
            width={48}
            height={48}
            alt="placeholder"
          />
        </InlineCenter>
        text.
      </p>
      <p>
        <InlineCenter>
          <img
            src={placeholder(48,48)}
            width={48}
            height={48}
            alt="placeholder"
          />
        </InlineCenter>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </>
  )
}


const placeholder = (
  width = 100,
  height = 100,
  {
    text = `${width}×${height}`,
    color = '#333',
    bg = '#ccc',
    fontSize = Math.floor(Math.min(width, height) * 0.22),
  } = {}
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${bg}"></rect><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" transform="translate(0 ${fontSize/8})" fill="${color}">${text}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}