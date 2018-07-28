import React, { Component } from 'react'

class List extends Component {
  render() {
    return (
      <div className="list">
        <h2>List of Places</h2>
        <ul>
          {this.props.places.map(place => (
            <li key={place.name}>
              {place.title.slice(0, 20)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List
