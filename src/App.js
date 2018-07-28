import React, { Component } from 'react'
import './App.css'
import MapContainer from './MapContainer'
import List from './List'

const allPlaces = [
  {
    title: 'Elektrenu marios',
    name: 'elektrenu-marios',
    position: {lat: 54.755719, lng: 24.669558}
  },{
    title: 'Ice Hockey Arena',
    name: 'ice-hockey-arena',
    position: {lat: 54.78447, lng: 24.669604}
  },{
    title: 'Power Plant',
    name: 'power-plant',
    position: {lat: 54.771311, lng: 24.648063}
  },{
    title: 'Main Beach',
    name: 'main-beach',
    position: {lat: 54.782091, lng: 24.665443}
  },{
    title: 'Second Beach',
    name: 'second-beach',
    position: {lat: 54.779074, lng: 24.677175}
  },{
    title: 'Elektrenu Mergeles Marijos Kankiniu Karalienes baznycia',
    name: 'church',
    position: {lat: 54.782097, lng: 24.680786}
  }
]

export class App extends Component {
  state = {
    places: allPlaces,
    pickMarkerName: ''
  }

  // function to filter original places and give new places array for rendering
  filterPlaces = (value) => {
    if (value) {
      value = value.trim().toLowerCase()
      let newPlaces = allPlaces.filter((place) => place.title.toLowerCase().includes(value))
      this.setState({places: newPlaces})
    } else {
      this.setState({places: allPlaces})
    }
  }

  pickMarker = (e) => {
    e.preventDefault()
    this.setState({pickMarkerName: e.target.className})
  }

  render() {
    return (
      <div className="app">
        <MapContainer
          places={this.state.places}
          pickMarkerName={this.state.pickMarkerName}
        />
        <List
          places={this.state.places}
          filterPlaces={this.filterPlaces}
          pickMarker={this.pickMarker}
        />
      </div>
    )
  }
}

export default App
