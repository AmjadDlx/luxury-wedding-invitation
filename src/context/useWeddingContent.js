import { useContext } from 'react'
import WeddingContentContext from './WeddingContentContext'

function useWeddingContent() {
  const context = useContext(WeddingContentContext)

  if (!context) {
    throw new Error('useWeddingContent must be used inside WeddingContentProvider')
  }

  return context
}

export default useWeddingContent
