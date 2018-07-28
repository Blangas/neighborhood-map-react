import React, { Component } from 'react'

class List extends Component {
  pickMarker = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="list">
        <h2>List of Places</h2>
        <input
          className="search-box"
          type="text"
          placeholder="Search places"
          onChange={(e) => this.props.filterPlaces(e.target.value)}
        />
        <ul>
          {this.props.places.map(place => (
            <li key={place.name}>
              <a href="#" onClick={this.pickMarker}>
                {place.title.slice(0, 20)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
