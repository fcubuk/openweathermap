// import { jsdom } from 'jsdom'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')

// Object.defineProperty(global, 'document', {})

// setupFile.js
// Object.defineProperty(document, 'global', {
//   value: document.createElement('script')
// })

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global)
}

Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.mount = Enzyme.mount
global.shallow = Enzyme.shallow
global.render = Enzyme.render
global.snapshot = toJson

// console.error = jest.fn((msg) => {
//   throw new Error(msg)
// })
