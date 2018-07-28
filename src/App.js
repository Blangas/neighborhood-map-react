import React, { Component } from 'react'
import './App.css'
import MapContainer from './MapContainer'
import List from './List'

const places = [
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
    places: places
  }

  filterPlaces = (value) => {

  }

  render() {
    return (
      <div className="app">
        <MapContainer
          places={places}
        />
        <List
          places={places}
          filterPlaces={this.filterPlaces}
        />
      </div>
    )
  }
}

export default App
