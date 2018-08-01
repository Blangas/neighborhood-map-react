import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'
import axios from 'axios'

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
    activeMarker: {},
    activePlace: {},
    showingInfoWindow: true,
    places: [],
    pickMarkerName: null
  }

  markers = []

  pickMarker = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      activePlace: props,
      showingInfoWindow: true
    })
  }

  onMapReady = (mapProps, map) => {
    this.setState({places: this.props.places})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.places !== this.props.places) {
      this.setState({places: this.props.places})
    }
    // Sets active marker from list pick
    if (prevProps.pickMarkerName !== this.props.pickMarkerName) {
      let markers = this.markers
      markers.splice(this.props.places.length) // fix to remove null elements after array becomes shorter because of search function
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].marker.name === this.props.pickMarkerName) {
          this.setState({activeMarker: markers[i].marker})
        }
      }
    }
    console.log('MapContainer did update.')
  }

  render() {
    return (
      <Map
        ref={(map) => {this.map = map}}
        className={'map'}
        google={this.props.google}
        zoom={13}
        initialCenter={{lat: 52.486243, lng: -1.890401}}
        style={nullStyle}
        onReady={this.onMapReady}
        onClick={this.onMapClick}
      >
        {this.state.places.map((place, i) => (
          <Marker
            ref={(marker) => {this.markers[i] = marker}}
            key={`marker-${place.name}`}
            title={place.title}
            address={place.address}
            name={place.name}
            position={place.position}
            animation={this.props.google.maps.Animation.DROP}
            onClick={this.pickMarker}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h3>{this.state.activeMarker.title}</h3>
            <p>{this.state.activeMarker.address}</p>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqzSZSb8wcrgjC4PyVOGYAlbuYLZ3h3Zc'
})(MapContainer)
