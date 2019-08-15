import React, { useState, useEffect } from 'react'
import Select from './Select'
import './swapi-viewer.css'

const fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
const ids = ['', ...Array(88).keys()].map(id => `${id}`)

export default function() {
  const [selectedId, setSelectedId] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedId) {
      setIsLoading(true)
      const url = `https://swapi.co/api/people/${selectedId}/`

      fetch(url, fetchConfig)
        .then(res => res.json())
        .then(setSelectedPerson)
        .finally(() => setIsLoading(false))
    }
  }, [selectedId])

  return (
    <div className="swapi-card">
      <h1>Hooks Swapi Viewer</h1>
      <label>Pick a character id:</label>
      <Select options={ids} selectedValue={selectedId} onChange={e => setSelectedId(e.target.value)} />
      <pre className="json-view">
        {isLoading ? 'loading...' : JSON.stringify(selectedPerson, null, 2)}
      </pre>
    </div>
  )
}
