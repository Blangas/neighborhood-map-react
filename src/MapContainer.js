import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'

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

  // TODO: delete after finish
  // logas = () => {
  //   console.log(window.google)
  // }
  componentDidMount() {debugger}
  dadadum = () => {debugger}

  render() {
    return (
      <Map
        className={'map'}
        google={this.props.google}
        zoom={13}
        initialCenter={{lat: 54.753986, lng: 24.670219}}
        style={nullStyle}
      >
        {this.props.places.map(place => (
          <Marker
            key={`marker-${place.name}`}
            title={place.title}
            name={place.name}
            position={place.position}
            // onClick={this.dadadum}
          />
        ))}
        {this.props.places.map(place => (
          <InfoWindow
            key={`infowindow-${place.name}`}
            visible={true}>
            <div>{place.title}</div>
          </InfoWindow>
        ))}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqzSZSb8wcrgjC4PyVOGYAlbuYLZ3h3Zc'
})(MapContainer)
