import React, { Component } from 'react'

export default class InfoWindowContent extends Component {
  state = {
    photos: []
  }

  componentDidMount() {
    this.setState({photos: this.props.photos})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.photos !== this.props.photos) {
      this.setState({photos: this.props.photos})
    }
    console.log('InfoWindowContent updated')
    console.log(this.state.photos)
  }

  render () {
    if (this.props.marker) {
      return (
        <div className="info-window">
          <div><strong>{this.props.marker.title}</strong></div>
          <div>{this.props.marker.address}</div>
          <div className="photos">
            {this.props.photos.map((photo, i) => (
              <img
                key={photo.id}
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                alt={this.props.marker.title+' photo '+i}
              />
            ))}
          </div>
        </div>
      )
    } else {
      return <div>No marker selected</div>
    }
  }
}
