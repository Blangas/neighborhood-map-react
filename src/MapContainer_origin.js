import React, { Component } from 'react'
import { GoogleApiWrapper, Map } from 'google-maps-react'
import axios from 'axios'

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
    mapProps: {},
    photos: []
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

  //  TODO 3rd party API fetching data
  infoWindowContent = (marker) => {
    let flickrSearch = 'https://api.flickr.com/services/rest/?'+
    'method=flickr.photos.search'+
    '&api_key=22b236d03286cc864a67b31c413e64fe'+
    '&text='+marker.title+
    '&content_type=1'+
    // '&lat='+marker.position.lat+
    // '&lon='+marker.position.lng+
    '&radius=5'+
    '&per_page=10'+
    '&format=json&nojsoncallback=1'
    // '&auth_token=72157669591509787-4275fc72a9edb20e&api_sig=0894f155bf4fdb3fa7a1ea2eda5f5ae8'+

    let photos = []

    axios.get(flickrSearch)
    .then((response) => {
      console.log(response)
      console.log(response.data.photos.photo)
      photos = response.data.photos.photo
    })
    .catch((error) => {
      console.log(`Got error in 1st step: ${error}`)
    })
    .then((response) => {
      this.state.infoWindow.setContent(
        `<div className="info-window" style="width: 300px; height: 500px">
          <div><strong>${marker.title}</strong></div>
          <div>${marker.address}</div>
          <div className="photos">
            <img src="https://farm${photos[0].farm}.staticflickr.com/${photos[0].server}/${photos[0].id}_${photos[0].secret}.jpg">
            <img src="https://farm${photos[1].farm}.staticflickr.com/${photos[1].server}/${photos[1].id}_${photos[1].secret}.jpg">
            <img src="https://farm${photos[2].farm}.staticflickr.com/${photos[2].server}/${photos[2].id}_${photos[2].secret}.jpg">
            <img src="https://farm${photos[3].farm}.staticflickr.com/${photos[3].server}/${photos[3].id}_${photos[3].secret}.jpg">
            <img src="https://farm${photos[4].farm}.staticflickr.com/${photos[4].server}/${photos[4].id}_${photos[4].secret}.jpg">
            <img src="https://farm${photos[5].farm}.staticflickr.com/${photos[5].server}/${photos[5].id}_${photos[5].secret}.jpg">
            <img src="https://farm${photos[6].farm}.staticflickr.com/${photos[6].server}/${photos[6].id}_${photos[6].secret}.jpg">
            <img src="https://farm${photos[7].farm}.staticflickr.com/${photos[7].server}/${photos[7].id}_${photos[7].secret}.jpg">
            <img src="https://farm${photos[8].farm}.staticflickr.com/${photos[8].server}/${photos[8].id}_${photos[8].secret}.jpg">
            <img src="https://farm${photos[9].farm}.staticflickr.com/${photos[9].server}/${photos[9].id}_${photos[9].secret}.jpg">
          </div
        </div>`
      )
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
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqzSZSb8wcrgjC4PyVOGYAlbuYLZ3h3Zc'
})(MapContainer)
