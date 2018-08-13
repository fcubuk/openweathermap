/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import WeatherPage from './pages/WeatherPage';

describe('index.js => WeatherPage', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WeatherPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
});