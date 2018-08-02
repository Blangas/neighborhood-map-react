  ***Run app***
To run a program locally:
1. Install dependencies:
      npm install
2.  a) start production version:
      npm start
    b) deployment version:
      npm install -g serve
      serve -s build

  ***Usage***
Choosing location name from list or marker on map, shows info in marker info window.
Can filter locations by name writing in search box.

P.S. uses build in create-react-app service worker to cache resources.

  ***Further development***
App easily modifiable by changing locations array and map coordinates.
Lack of design needs attention (will target this problem later)

  ***Project resources***
This project was bootstrapped with [Create React App] (https://github.com/facebookincubator/create-react-app).

In project used packages:
  - google-maps-react
      https://www.npmjs.com/package/google-maps-react
  - axios
      https://github.com/axios/axios

And used information/examples from:
  - How to Write a Google Maps React Component
      https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#
  - google-maps-react makes adding Google Maps Api to a React app a breeze
      https://itnext.io/google-maps-react-makes-adding-google-maps-api-to-a-react-app-a-breeze-effb7b89e54
  - How can I fetch data from an external API in React.js?
      https://www.quora.com/How-can-I-fetch-data-from-an-external-API-in-React-js-1#
  - React documentation:
    - Components and Props
        https://reactjs.org/docs/components-and-props.html
    - State and Lifecycle
        https://reactjs.org/docs/state-and-lifecycle.html
    - React.Component
        https://reactjs.org/docs/react-component.html#componentdidmount
    - Refs and the DOM
        https://reactjs.org/docs/refs-and-the-dom.html
    - React Top-Level API
        https://reactjs.org/docs/react-api.html
  - Udacity lessons and examples.
