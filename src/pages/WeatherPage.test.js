/* 
* @jest-environment jsdom
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import WeatherPage from './WeatherPage';

jest.mock('../services/contentService');

describe('<WeatherPage /> component', () => {
  it('should render without data correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WeatherPage />, div);
    ReactDOM.unmountComponentAtNode(div);
    const wrapper = shallow(<WeatherPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls componentDidMount() lifecycle method and gets locations data', done => {
    const wrapper = shallow(<WeatherPage />);

    setTimeout(() => {
      const state = wrapper.instance().state;
      const locationsLength = state.locations.length;
      expect(locationsLength).toBe(3)
      done();
    });
  });

  it('calls handleForecastOptions to fetch data', done => {
    const wrapper = shallow(<WeatherPage />);
    // console.log('forecasts', wrapper.state('forecasts'))
    const location_id = 2648110;
    const instance = wrapper.instance();
    setTimeout(() => {
      instance.handleForecastOptions({ location_id });
      // console.log('forecasts ===', wrapper.state('forecasts'))
      expect(wrapper.state('forecasts')).toBeNull()
      done();
    })
  });


});