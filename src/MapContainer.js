import React, { Component } from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'
import axios from 'axios'
import InfoWindowContent from './InfoWindowContent'

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
    pickMarkerName: null,
    photos: [],
    markerAnimation: 'DROP'
  }

  markers = []

  onMapReady = (mapProps, map) => {
    this.setState({places: this.props.places})
  }

  onMapClick = (mapProps, map, e) => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }

  pickMarker = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      activePlace: props,
      showingInfoWindow: true,
    })
    this.infoWindowContent(marker)
  }

  infoWindowContent = (marker) => {
    let flickrSearch = 'https://api.flickr.com/services/rest/?'+
    'method=flickr.photos.search'+
    '&api_key=22b236d03286cc864a67b31c413e64fe'+
    '&text='+marker.title+
    '&content_type=1'+
    // '&lat='+marker.position.lat+  //removed position search, because then it have 0 results
    // '&lon='+marker.position.lng+
    '&radius=5'+
    '&per_page=10'+
    '&format=json&nojsoncallback=1'


    axios.get(flickrSearch)
    .then((response) => {
      this.setState({photos: response.data.photos.photo})
    })
    .catch((error) => {
      console.log(`Got error in 1st step: ${error}`)
    })
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
          // if (this.state.activeMarker !== []) {
          //   this.state.activeMarker.animation = null
          // }
          this.setState({activeMarker: markers[i].marker, markerAnimation: 'BOUNCE'})
          this.infoWindowContent(markers[i].marker)
        }
      }
    }
    // if (this.state.activeMarker && prevState.activeMarker !== this.state.activeMarker) {
    //   prevState.activeMarker.animation = null
    //   this.state.activeMarker.animation = this.props.google.maps.Animation.BOUNCE
    // }
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
        role="application"
      >
        {this.state.places.map((place, i) => (
          <Marker
            ref={(marker) => {this.markers[i] = marker}}
            key={`marker-${place.name}`}
            title={place.title}
            address={place.address}
            name={place.name}
            position={place.position}
            animation={this.props.google.maps.Animation[this.state.markerAnimation]}
            onClick={this.pickMarker}
          />
        ))}
        <InfoWindow
          ref={(infoWindow) => {this.infoWindow = infoWindow}}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <InfoWindowContent
            marker={this.state.activeMarker}
            photos={this.state.photos}
          />
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqzSZSb8wcrgjC4PyVOGYAlbuYLZ3h3Zc'
})(MapContainer)
