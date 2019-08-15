import React from 'react'
import Select from './Select'
import './swapi-viewer.css'

// This is syntactic sugar for prototypal inheritance!
export default class ClassSwapiViewer extends React.Component {

  constructor(props) {
    // Super them props! Don't forget it!
    super(props)

    this.fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
    this.ids = ['', ...Array(88).keys()].map(id => `${id}`)

    // Default state here!
    this.state = {
      selectedId: '',
      person: null,
      isLoading: false
    }

    // Don't forget to bind correctly and reassign the function or use an arrow function as a class property!
    // Fun Fact: My number 1 React gotcha is forgetting to reassign the function to be the bound value, not missing the bind to this.
    this.setSelectedId = this.setSelectedId.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedId } = this.state

    // Check to make sure the thing actually changed!
    if (this.state.selectedId && prevState.selectedId !== selectedId) {
      this.setState({ isLoading: true })
      const url = `https://swapi.co/api/people/${selectedId}/`

      fetch(url, this.fetchConfig)
        .then(res => res.json())
        .then(person => this.setState({ person })) // If this depended on pervious state, gotta make sure to use a function param with setState instead!
        .finally(() => this.setState({ isLoading: false }))
    }
  }

  // Alternative to function on class is the class property with an arrow function
  // setSelectedId = e => this.setState({ selectedId: e.target.value })
  setSelectedId(e) {
    this.setState({ selectedId: e.target.value })
  }
  
  render() {
    // Destructure to avoid tons of this.state.{insert_prop_here}!
    const { selectedId, person, isLoading } = this.state

    return (
      <div className="swapi-card">
        <h1>Swapi Viewer</h1>
        <label>Pick a character id:</label>
        <Select options={this.ids} selectedValue={selectedId} onChange={this.setSelectedId} />
        <pre className="json-view">
          {isLoading ? 'loading...' : JSON.stringify(person, null, 2)}
        </pre>
      </div>
    )
  }
}
