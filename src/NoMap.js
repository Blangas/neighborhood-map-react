import React, { Component } from 'react'

export default class InfoWindowContent extends Component {
  render() {
    return (
      <div className="map">
        <div>
          <p className="err-div">...Google maps failed to load...</p>
          <p>Go get some cat images instead!</p>
        </div>
      </div>
    )
  }
}
