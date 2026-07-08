import { useMemo, useRef, useState } from 'react'
import { FiDownload, FiRefreshCw, FiSave, FiUpload } from 'react-icons/fi'
import useWeddingContent from '../../context/useWeddingContent'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function labelFromKey(key) {
  return String(key)
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getInputType(path, value) {
  const key = String(path.at(-1) ?? '').toLowerCase()

  if (typeof value === 'boolean') {
    return 'checkbox'
  }

  if (typeof value === 'number') {
    return 'number'
  }

  if (key.includes('date') && /^\d{4}-\d{2}-\d{2}/.test(String(value))) {
    return 'date'
  }

  if (key.includes('email')) {
    return 'email'
  }

  if (key.includes('url') || key.includes('image') || key.includes('track') || String(value).startsWith('http')) {
    return 'url'
  }

  return String(value).length > 72 ? 'textarea' : 'text'
}

function setValueAtPath(source, path, value) {
  const next = clone(source)
  let cursor = next

  path.slice(0, -1).forEach((segment) => {
    cursor = cursor[segment]
  })

  cursor[path.at(-1)] = value
  return next
}

function Field({ path, value, onChange }) {
  const inputType = getInputType(path, value)
  const id = path.join('-')
  const label = labelFromKey(path.at(-1))

  if (inputType === 'checkbox') {
    return (
      <label className="editor-toggle" htmlFor={id}>
        <span>{label}</span>
        <input
          checked={value}
          id={id}
          onChange={(event) => onChange(path, event.target.checked)}
          type="checkbox"
        />
      </label>
    )
  }

  if (inputType === 'textarea') {
    return (
      <label className="editor-field" htmlFor={id}>
        <span>{label}</span>
        <textarea
          id={id}
          onChange={(event) => onChange(path, event.target.value)}
          rows={4}
          value={value}
        />
      </label>
    )
  }

  return (
    <label className="editor-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        onChange={(event) => {
          const nextValue = inputType === 'number' ? Number(event.target.value) : event.target.value
          onChange(path, nextValue)
        }}
        step={inputType === 'number' ? '0.01' : undefined}
        type={inputType}
        value={value}
      />
    </label>
  )
}

function EditableNode({ label, path, value, onChange }) {
  if (Array.isArray(value)) {
    return (
      <details className="editor-group" open={path.length < 2}>
        <summary>{label}</summary>
        <div className="editor-group-body">
          {value.map((item, index) => (
            <EditableNode
              key={`${path.join('.')}-${index}`}
              label={`${labelFromKey(String(index + 1))}`}
              onChange={onChange}
              path={[...path, index]}
              value={item}
            />
          ))}
        </div>
      </details>
    )
  }

  if (value && typeof value === 'object') {
    return (
      <details className="editor-group" open={path.length < 1}>
        <summary>{label}</summary>
        <div className="editor-group-body">
          {Object.entries(value).map(([key, childValue]) => (
            <EditableNode
              key={[...path, key].join('.')}
              label={labelFromKey(key)}
              onChange={onChange}
              path={[...path, key]}
              value={childValue}
            />
          ))}
        </div>
      </details>
    )
  }

  return <Field onChange={onChange} path={path} value={value} />
}

function ContentEditor() {
  const { content, resetContent, saveContent } = useWeddingContent()
  const [draft, setDraft] = useState(content)
  const [status, setStatus] = useState('Ready')
  const fileInputRef = useRef(null)
  const sections = useMemo(() => Object.entries(draft), [draft])

  const handleChange = (path, value) => {
    setDraft((currentDraft) => setValueAtPath(currentDraft, path, value))
    setStatus('Unsaved changes')
  }

  const handleSave = () => {
    saveContent(draft)
    setStatus('Saved')
  }

  const handleReset = () => {
    resetContent()
    window.location.reload()
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'wedding-content.json'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const nextDraft = JSON.parse(await file.text())
      setDraft(nextDraft)
      setStatus('Imported. Save to apply.')
    } catch {
      setStatus('Could not read that JSON file')
    } finally {
      event.target.value = ''
    }
  }

  return (
    <main className="editor-page min-h-screen bg-ivory text-ink">
      <header className="editor-header">
        <div>
          <p className="editor-kicker">Wedding Content Studio</p>
          <h1>One Place To Edit Everything</h1>
        </div>
        <div className="editor-actions" aria-label="Editor actions">
          <button onClick={handleSave} type="button">
            <FiSave aria-hidden="true" />
            Save
          </button>
          <button onClick={handleExport} type="button">
            <FiDownload aria-hidden="true" />
            Export
          </button>
          <button onClick={() => fileInputRef.current?.click()} type="button">
            <FiUpload aria-hidden="true" />
            Import
          </button>
          <button onClick={handleReset} type="button">
            <FiRefreshCw aria-hidden="true" />
            Reset
          </button>
          <input
            accept="application/json"
            className="sr-only"
            onChange={handleImport}
            ref={fileInputRef}
            type="file"
          />
        </div>
      </header>

      <section className="editor-status" aria-live="polite">
        <span>{status}</span>
        <a href="/">View invitation</a>
      </section>

      <section className="editor-grid">
        {sections.map(([key, value]) => (
          <EditableNode
            key={key}
            label={labelFromKey(key)}
            onChange={handleChange}
            path={[key]}
            value={value}
          />
        ))}
      </section>
    </main>
  )
}

export default ContentEditor
