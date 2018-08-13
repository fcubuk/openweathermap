import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.mount = Enzyme.mount
global.shallow = Enzyme.shallow
global.render = Enzyme.render
global.snapshot = toJson

console.error = jest.fn((msg) => {
  throw new Error(msg)
})
