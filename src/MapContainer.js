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
  markers = []
  infowindows = []

  // I creating markers not with google-maps-react package, so I would have more control
  createMarkers = (mapProps, map) => {
    this.props.places.map(place => {
      let marker = new this.props.google.maps.Marker({
        position: place.position,
        title: place.title,
        name: place.name,
        map: map,
        animation: this.props.google.maps.Animation.DROP,
        id: place.name
      })
      this.markers.push(marker)
      let infoWindow = new this.props.google.maps.InfoWindow({
        marker: marker,
        content: `<div>${place.title}</div>`
      })
      marker.addListener('click', () => infoWindow.open(map, marker))
    })
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
