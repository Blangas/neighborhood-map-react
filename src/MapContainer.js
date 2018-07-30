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
    activeMarker: {title: 'dummy', position: {lat: 52.486243, lng: -1.890401}},
    infowindow: {},
    map: {},
    mapProps: {}
  }

  // I creating markers not with google-maps-react package, so I would have more control
  createMarkers = (mapProps, map) => {
    this.setState({mapProps, map}) //save if I will need them late

    let newMarkers = []
    let places = this.props.places
    for (let i = 0; i < places.length; i++) {
      let marker = new this.props.google.maps.Marker({
        position: places[i].position,
        title: places[i].title,
        address: places[i].address,
        name: places[i].name,
        map: map,
        animation: this.props.google.maps.Animation.DROP,
        id: places[i].name
      })
      marker.addListener('click', () => this.activeMarker(map, marker))
      newMarkers.push(marker)

      // let infoWindow = new this.props.google.maps.InfoWindow({
      //   marker: marker,
      //   content: `<div>${place.title}</div>`
      // })
    }
    this.setState({markers: newMarkers})

    let infoWindow = new this.props.google.maps.InfoWindow()
    this.setState({infoWindow})
  }

  activeMarker(map, marker) {
    this.setState({activeMarker: marker})
    const infoWindow = this.state.infoWindow
    infoWindow.setContent(
      `<div><strong>${marker.title}</strong></div>
      <div>${marker.address}</div>`
    )
    infoWindow.setPosition(marker.position)
    infoWindow.open(map, marker)
    this.infoWindowContent(marker)

  }

  // on props update check which markers show/hide
  componentDidUpdate(prevProps, prevState) {
    // Showing places list/markers update
    const markers = this.state.markers
    const places = this.props.places
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

    // Showing selected from the list marker update
    const pickMarkerName = this.props.pickMarkerName
    if (prevProps.pickMarkerName !== pickMarkerName) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].name === pickMarkerName) {
          this.activeMarker(this.state.map, markers[i])
        }
      }
    }
  }

  //  TODO 3rd party API
  infoWindowContent = (marker) => {
    let flickr = 'https://api.flickr.com/services/rest/?'+
    'method=flickr.photos.search'+
    '&api_key=22b236d03286cc864a67b31c413e64fe'+
    '&text='+'Statue'+
    '&content_type=1'+
    // '&lat='+'52.486243'+
    // '&lon='+'-1.890401'+
    '&radius=5'+
    '&per_page=10'+
    '&format=json&nojsoncallback=1'
    // '&auth_token=72157669591509787-4275fc72a9edb20e&api_sig=0894f155bf4fdb3fa7a1ea2eda5f5ae8'+

    window.fetch(flickr)
      .then((response) => {
        console.log(flickr)
        console.log(response)
      })
  }

  render() {
    return (
      <Map
        className={'map'}
        google={this.props.google}
        zoom={13}
        initialCenter={{lat: 52.486243, lng: -1.890401}}
        style={nullStyle}
        onReady={this.createMarkers}
      >
        {/* TODO {this.props.places.map(place => (
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
