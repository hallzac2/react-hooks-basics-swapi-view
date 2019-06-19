import React, { useState, useEffect } from 'react'
import Select from './select'

const fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
const ids = ['', ...Array(88).keys()].map(id => `${id}`)

export default function() {
  const [selectedId, setSelectedId] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  useEffect(() => {
    if (selectedId) {
      const url = `https://swapi.co/api/people/${selectedId}/`
      fetch(url, fetchConfig)
        .then(res => res.json())
        .then(person => setSelectedPerson(person))
    }
  }, [selectedId])

  return (
    <>
      <h1>Hooks Swapi Viewer</h1>
      <label>Pick a character id:</label>
      <Select options={ids} selectedValue={selectedId} onChange={e => setSelectedId(e.target.value)} />
      <pre>{JSON.stringify(selectedPerson, null, 2)}</pre>
    </>
  )
}
