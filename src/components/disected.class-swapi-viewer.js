import React from 'react'
import Select from './select'

// Who knows how JS inheritance actually works? This is syntactic sugar for prototypal inheritance!
export default class SwapiViewer extends React.Component {

  constructor(props) {
    // Super them props! Don't forget it!
    super(props)

    this.fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
    this.ids = ['', ...Array(88).keys()].map(id => `${id}`)

    // Default state here!
    this.state = {
      selectedId: '',
      person: null
    }

    // Don't forget to bind correctly AND reassign the function OR use an arrow function as a class property! Isn't THAT confusing?
    // Fun Fact: My number 1 React gotcha is forgetting to reassign the function to be the bound value, not missing the bind to this.
    this.setSelectedId = this.setSelectedId.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedId } = this.state

    // Check to make sure the thing actually changed!
    if (this.state.selectedId && prevState.selectedId !== selectedId) {
      const url = `https://swapi.co/api/people/${selectedId}/`
      fetch(url, this.fetchConfig)
        .then(res => res.json())
        .then(person => this.setState({ person })) // If this depended on pervious state, gotta make sure to use a function param with setState instead!
    }
  }

  // Alternative to function on class is the class property with an arrow function
  // setSelectedId = e => this.setState({ selectedId: e.target.value })
  setSelectedId(e) {
    this.setState({ selectedId: e.target.value })
  }
  
  render() {
    // Destructure to avoid tons of this.state.{insert_prop_here}!
    const { selectedId, person } = this.state

    // https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html
    return (
      <>
        <h1>Swapi Viewer</h1>
        <label>Pick a character id:</label>
        <Select options={this.ids} selectedValue={selectedId} onChange={this.setSelectedId} />
        <pre>{JSON.stringify(person, null, 2) }</pre>
      </>
    )
  }
}
