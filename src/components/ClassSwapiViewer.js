import React from 'react'
import Select from './Select'
import './swapi-viewer.css'

export class ClassSwapiViewer extends React.Component {

  constructor(props) {
    super(props)

    this.fetchConfig = { headers: { accept: 'application/json; charset=utf=8' } }
    this.ids = ['', ...Array(88).keys()].map(id => `${id}`)

    this.state = {
      selectedId: '',
      person: null,
      isLoading: false
    }

    this.setSelectedId = this.setSelectedId.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedId } = this.state

    if (this.state.selectedId && prevState.selectedId !== selectedId) {
      this.setState({ isLoading: true })
      const url = `https://swapi.co/api/people/${selectedId}/`
      
      fetch(url, this.fetchConfig)
        .then(res => res.json())
        .then(person => this.setState({ person }))
        .finally(() => this.setState({ isLoading: false }))
    }
  }

  setSelectedId(e) {
    this.setState({ selectedId: e.target.value })
  }
  
  render() {
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
