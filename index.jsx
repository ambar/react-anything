import React from 'react'

// zero-width space
const ZWSP = '\u200b'

const InlineCenter = ({children, disabled = false}) =>
  disabled ? (
    children
  ) : (
    <span style={{display: 'inline-flex', alignItems: 'center'}}>
      {ZWSP}{children}
    </span>
  )

export default InlineCenter
