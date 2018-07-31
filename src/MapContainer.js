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
    showingInfoWindow: false,
    places: []
  }

  pickMarker = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      activePlace: props,
      showingInfoWindow: true
    })
  }

  componentDidMount() {
    this.setState({places: this.props.places})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.places !== this.props.places) {
      this.setState({places: this.props.places})
    }
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
        {this.state.places.map(place => (
          <Marker
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
