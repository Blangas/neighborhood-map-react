import React, { Component } from 'react'
import { GoogleApiWrapper, Map } from 'google-maps-react'

// nullStyle used to remove styles from map, so it can be styled in my App.css
const nullStyle = {
  position: null,
  left: null,
  right: null,
  bottom: null,
  top: null,
  width: null,
  height: null
}

export class MapContainer extends Component {
  state = {
    markers: [],
    activeMarker: {},
    infowindow: {},
  }

  // I creating markers not with google-maps-react package, so I would have more control
  createMarkers = (mapProps, map) => {
    this.setState({mapProps, map}) //save if I will need them late

    let newMarkers = []
    this.props.places.map(place => {
      let marker = new this.props.google.maps.Marker({
        position: place.position,
        title: place.title,
        name: place.name,
        map: map,
        animation: this.props.google.maps.Animation.DROP,
        id: place.name
      })
      marker.addListener('click', () => this.activeMarker(map, marker))
      newMarkers.push(marker)

      // let infoWindow = new this.props.google.maps.InfoWindow({
      //   marker: marker,
      //   content: `<div>${place.title}</div>`
      // })
    })
    this.setState({markers: newMarkers})

    let infoWindow = new this.props.google.maps.InfoWindow
    this.setState({infoWindow})
  }

  activeMarker(map, marker) {
    this.setState({activeMarker: marker})
    const infoWindow = this.state.infoWindow
    this.setState({infoWindowVisible: true})
    infoWindow.setContent(`<div>${marker.title}</div>`)
    infoWindow.setPosition(marker.position)
    infoWindow.open(map, marker)
  }

  // on props update check which markers show/hide
  componentDidUpdate(prevProps, prevState) {
    const places = this.props.places
    const markers = this.state.markers
    if (prevProps.places !== places) {
      // create on string of new places names
      let placesNames = ''
      for (let i = 0; i < places.length; i++) {
        placesNames += places[i].name
      }
      // compare markers name with placesNames and hide mismatch
      for (let i = 0; i < markers.length; i++) {
        if (placesNames.includes(markers[i].name)) {
          markers[i].setMap(this.state.map)
        } else {
          markers[i].setMap(null)
        }
      }
    }
  }

  render() {
    return (
      <Map
        className={'map'}
        google={this.props.google}
        zoom={13}
        initialCenter={{lat: 54.753986, lng: 24.670219}}
        style={nullStyle}
        onReady={this.createMarkers}
      >
        {/* {this.props.places.map(place => (
          <Marker
            key={`marker-${place.name}`}
            title={place.title}
            name={place.name}
            position={place.position}
            // onClick={this.dadadum}
          />
        ))} */}
        {/* <InfoWindow
          visible={true}
          position={place.position}>
          <div>{place.title}</div>
        </InfoWindow> */}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqzSZSb8wcrgjC4PyVOGYAlbuYLZ3h3Zc'
})(MapContainer)
