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
    activeMarker: null,
    activePlace: {},
    showingInfoWindow: true,
    places: [],
    pickMarkerName: null,
    photos: [],
  }

  markers = []

  onMapReady = (mapProps, map) => {
    this.setState({places: this.props.places})
  }

  // On map click deselects marker
  onMapClick = (mapProps, map, e) => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      pickMarkerName: null
    })
  }

  // Function to generate flickr request link and request photos
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

  // Function to activate in the map clicked marker
  pickMarker = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      activePlace: props,
      showingInfoWindow: true,
    })
    this.state.activeMarker.setAnimation(1)
    this.infoWindowContent(marker)
  }

  componentDidUpdate(prevProps, prevState) {
    // Updates list of places by which to render markers
    if (prevProps.places !== this.props.places) {
      this.setState({places: this.props.places})
    }

    // Sets active marker from list pick
    if (prevState.pickMarkerName !== this.props.pickMarkerName) {
      let markers = this.markers
      markers.splice(this.props.places.length) // fix to remove null elements after array becomes shorter because of search function
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].marker.name === this.props.pickMarkerName) {
          this.setState({
            pickMarkerName: this.props.pickMarkerName,
            activeMarker: markers[i].marker,
            showingInfoWindow: true
          })
          markers[i].marker.setAnimation(1)
          this.infoWindowContent(markers[i].marker)
        }
      }
    }

    // Removes bounce animation from previously selected marker
    if (prevState.activeMarker && prevState.activeMarker !== this.state.activeMarker) {
      prevState.activeMarker.setAnimation(null)
    }
  }

  render() {
    if (!this.props.google) {
      return (
        <div className="map">
          <div className="err-div">Can't load Google Maps API...</div>
        </div>
      )
    } else {
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
                animation={2}
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
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAL0P7HWziTI7Ru9Sdjm8xknCa_GtQOETg'
})(MapContainer)
