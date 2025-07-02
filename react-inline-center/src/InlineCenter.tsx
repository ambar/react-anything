// zero-width space
const ZWSP = '\u200b'

type Props = {
  children: React.ReactNode
  disabled?: boolean
}

const InlineCenter = ({children, disabled = false}: Props) =>
  disabled ? (
    <>{children}</>
  ) : (
    <span style={{display: 'inline-flex', alignItems: 'center'}}>
      {ZWSP}
      {children}
    </span>
  )

export default InlineCenter
