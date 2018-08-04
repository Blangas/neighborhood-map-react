import React, { Component } from 'react'

class List extends Component {
  state = {
    showMenu: 'hide',
    menuButtonIndex: 0,
    hideButtonIndex: -1
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
    this.setState({
      showMenu: '',
      menuButtonIndex: -1,
      hideButtonIndex: 0
    })
  }

  hideList = () => {
    this.setState({
      showMenu: 'hide',
      menuButtonIndex: 0,
      hideButtonIndex: -1
    })
  }

  render() {
    return (
      <div>
        <button
          className="menu-button"
          onClick={this.showList}
          tabIndex={this.state.menuButtonIndex}>
            Places list
        </button>
        <div id="list" className={this.state.showMenu}>
          <h2>List of Places</h2>
          <p id="search-label">Search box:</p>
          <input
            className="search-box"
            type="text"
            placeholder="Search places"
            onChange={(e) => this.props.filterPlaces(e.target.value)}
            aria-labelledby="search-label"
          />
          <ul>
            {this.props.places.map(place => (
              <li key={place.name}>
                <button
                  className={place.name}
                  tabIndex="0"
                  onClick={this.props.pickMarker}>
                    {this.titleShortener(place.title)}
                </button>
              </li>
            ))}
          </ul>
          <button className="hide-button" onClick={this.hideList}>{'<< Hide list'}</button>
          <p className="attribution">Photos source: <a href="https://www.flickr.com/">flickr</a></p>
        </div>
      </div>
    )
  }
}

export default List
