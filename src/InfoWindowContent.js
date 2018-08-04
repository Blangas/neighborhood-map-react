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
  }

  render () {
    if (this.props.marker && this.props.photos.length > 0) {
      return (
        <div
          className="info-window"
          tabIndex="0">
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
    } else if (this.props.marker) {
      return (
        <div
          className="info-window"
          tabIndex="0">
            <div><strong>{this.props.marker.title}</strong></div>
            <div>{this.props.marker.address}</div>
            <div className="photos">
              <p>...flickr couldn't get any photos...</p>
            </div>
        </div>
      )
    } else {
      return <div>No marker selected</div>
    }
  }
}
