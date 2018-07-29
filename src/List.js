import React, { Component } from 'react'

class List extends Component {

  // function to shorten too long list items
  titleShortener = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + '...'
    } else {
      return title
    }
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
              <button className={place.name} onClick={this.props.pickMarker}>
                {this.titleShortener(place.title)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
