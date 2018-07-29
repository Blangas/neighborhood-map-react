import React, { Component } from 'react'
import './App.css'
import MapContainer from './MapContainer'
import List from './List'



const allPlaces = [
  {
    title: 'Boulton, Watt and Murdoch Statue',
    name: 'statue01',
    position: {lat: 52.478573, lng: -1.908425},
    address: '300 Centenary Square, Birmingham B1 2DR, UK',
    tags: ['Statue', 'Historical', 'Landmark']
  },{
    title: 'Queen Victoria Statue',
    name: 'statue02',
    position: {lat: 52.479655, lng: -1.902996},
    address: '38 Paradise St, Birmingham B1 2AF, UK',
    tags: ['Statue', 'Historical', 'Landmark']
  },{
    title: 'Tony Hancock Sculpture',
    name: 'statue03',
    position: {lat: 52.482194, lng: -1.893837},
    address: '150 Corporation St, Birmingham B4 6TB, UK',
    tags: ['Sculpture', 'Landmark']
  },{
    title: 'Admiral Horatio Nelson Monument',
    name: 'statue04',
    position: {lat: 52.477455, lng: -1.893966},
    address: 'Birmingham B5 4BW, UK',
    tags: ['Statue', 'Historical', 'Landmark']
  },{
    title: 'Equestrian statue of King George 1',
    name: 'statue05',
    position: {lat: 52.450125, lng: -1.926999},
    address: 'Edgbaston Park Rd, Birmingham B15 2UD, UK',
    tags: ['Statue', 'Historical', 'Landmark']
  },{
    title: 'Birmingham Civilian War Memorial',
    name: 'statue06',
    position: {lat: 52.476686, lng: -1.893907},
    address: 'Edgbaston St, Birmingham B5 5BB, UK',
    tags: ['Historical', 'Landmark']
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
