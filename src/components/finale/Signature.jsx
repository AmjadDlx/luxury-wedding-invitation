import { memo } from 'react'

function Signature({ children, signatureRef }) {
  return (
    <p className="finale-signature" ref={signatureRef}>
      {children}
    </p>
  )
}

export default memo(Signature)
