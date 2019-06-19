import React, { useState, useEffect } from 'react'
import Select from './select'

const fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
const ids = ['', ...Array(88).keys()].map(id => `${id}`)

// Hooks pull out a ton of complexity for us and allow the React devs to optimize our components under the hood
// Hook convention is that the name always starts with "use" 
// Hooks are never to be used inside of class components, only in function components
// We can create our own custom hooks for various things
// Tons of hooks exist for React features and for 3rd party things like routing and redux
// No need to worry about js 'this' at all. Either arrow functions or regular functions can be used.
//    NOTE: Be very deliberate about when to use an arrow function vs when not to as it will bite you
export default function() {
  // Default the state we want to use
  // Must always be ran in the same order and should never be behind if statements!!!
  // Returns the value of the prop and the function to update the prop
  // setState guarantees the value is always stable!
  const [selectedId, setSelectedId] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  // Setup our API call
  // By default, this will run every time the component updates. This is a combination of componentDidMount and componentDidUpdate
  // An optional second param of type array can be supplied to tell React what props to diff before running this function
  //    [] implies componentDidMount as no values are cared about
  //    [selectedId] implies run the effect on componentDidMount and componentDidUpdate if selectedId has changed
  //    Passing no param implies run on componentDidMount and componentDidUpdate each time
  // Data is closed upon to fdorm a closure so everything can be accessed!
  useEffect(() => {
    if (selectedId) {
      const url = `https://swapi.co/api/people/${selectedId}/`
      fetch(url, fetchConfig)
        .then(res => res.json())
        .then(person => setSelectedPerson(person)) // Freely update this without worrying, even if the new value is dependent on the old value

      // Effects can return a function to tell React how to cleanup this effect on destroy. Cancel setTimeouts, unsubscribe from observables, etc.
      // return () => { /* Optional effect clean up here */ }
    }
  }, [selectedId])

  // Render as normal
  return (
    <>
      <h1>Hooks Swapi Viewer</h1>
      <label>Pick a character id:</label>
      <Select options={ids} selectedValue={selectedId} onChange={e => setSelectedId(e.target.value)} />
      <pre>{JSON.stringify(selectedPerson, null, 2)}</pre>
    </>
  )
}
