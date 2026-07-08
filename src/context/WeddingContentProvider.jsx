import { useCallback, useMemo, useState } from 'react'
import { weddingData } from '../data/weddingData'
import WeddingContentContext from './WeddingContentContext'

const storageKey = 'wedding-content-overrides'

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function mergeContent(base, overrides) {
  if (Array.isArray(base)) {
    return Array.isArray(overrides)
      ? overrides.map((item, index) => mergeContent(base[index] ?? item, item))
      : base
  }

  if (isObject(base)) {
    return Object.fromEntries(
      Object.entries(base).map(([key, value]) => [
        key,
        key in (overrides ?? {}) ? mergeContent(value, overrides[key]) : value,
      ]),
    )
  }

  return overrides ?? base
}

function readStoredContent() {
  try {
    const storedContent = window.localStorage.getItem(storageKey)
    return storedContent ? JSON.parse(storedContent) : weddingData
  } catch {
    return weddingData
  }
}

function writeStoredContent(content) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(content))
  } catch {
    // Edits still work for this session when browser storage is unavailable.
  }
}

function WeddingContentProvider({ children }) {
  const [content, setContent] = useState(readStoredContent)

  const saveContent = useCallback((nextContent) => {
    const mergedContent = mergeContent(weddingData, nextContent)
    setContent(mergedContent)
    writeStoredContent(mergedContent)
  }, [])

  const resetContent = useCallback(() => {
    setContent(weddingData)

    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // Ignore storage failures; the in-memory reset has already happened.
    }
  }, [])

  const value = useMemo(
    () => ({
      content,
      resetContent,
      saveContent,
    }),
    [content, resetContent, saveContent],
  )

  return (
    <WeddingContentContext.Provider value={value}>
      {children}
    </WeddingContentContext.Provider>
  )
}

export default WeddingContentProvider
