import React, { Component } from 'react'

class List extends Component {
  state = {
    showMenu: 'hide'
  }

  // function to shorten too long list items
  titleShortener = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + '...'
    } else {
      return title
    }
  }

  showList = () => {
    this.setState({showMenu: ''})
  }

  hideList = () => {
    this.setState({showMenu: 'hide'})
  }

  render() {
    return (
      <div>
        <div className="menu">
          <button onClick={this.showList}>Places list</button>
        </div>
        <div id="list" className={this.state.showMenu}>
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
          <button onClick={this.hideList}>{'<< Hide list'}</button>
        </div>
      </div>
    )
  }
}

export default List
