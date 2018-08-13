/**
 * @jest-environment jsdom
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import * as sinon from 'sinon';
import FindForecastForm from './FindForecastForm';

const mockProps = {
  locations: [
    {
      "id": 5128638,
      "name": "New York",
      "country": "US",
      "coord": {
        "lon": -75.499901,
        "lat": 43.000351
      }
    },
    {
      "id": 2648110,
      "name": "Greater London",
      "country": "GB",
      "coord": {
        "lon": -0.16667,
        "lat": 51.5
      }
    }
  ],
  locationID: 'New York,US',
  selectedTemperatureUnit: 'metric'
};

describe('<FindForecastForm /> component', () => {

  test('should render and unmount correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FindForecastForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('should render correctly', () => {
    const wrapper = shallow(<FindForecastForm />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const wrapper = shallow(<FindForecastForm {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render error for invalid show weather click', () => {
    const wrapper = shallow(<FindForecastForm />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    // expect(wrapper).toMatchSnapshot();
  });

  test('should select "Greater London,GB" as location and render without error', () => {
    const locationID = 'Greater London,GB';
    const wrapper = shallow(<FindForecastForm {...mockProps} />);
    wrapper.find('select').simulate('change', { target: { value: locationID } });
    expect(wrapper.state('error')).toBeNull();
  });

  test('should call handleForecastOptions for valid submission', () => {
    const locationID = 'Greater London,GB';
    const handleForecastOptionsSpy = jest.fn();
    const wrapper = shallow(<FindForecastForm {...mockProps} handleForecastOptions={handleForecastOptionsSpy} />);
    wrapper.find('select').simulate('change', { target: { value: locationID } });
    // console.log(wrapper.debug())
    wrapper.find('button').simulate('click');
    expect(handleForecastOptionsSpy).toHaveBeenCalledWith({
      location_id: locationID,
      selectedTemperatureUnit: 'metric',
      error: null
    });
  });

  test('should change temperature unit to "imperial"', () => {
    const handleTemperatureUnitChangeSpy = sinon.spy();
    const handleLocationChangeSpy = sinon.spy()
    const handleForecastOptionsSpy = sinon.spy();
    const wrapper = mount(<FindForecastForm
      {...mockProps}
      handleTemperatureUnitChange={handleTemperatureUnitChangeSpy}
      handleLocationChange={handleLocationChangeSpy}
      handleForecastOptions={handleForecastOptionsSpy} />);
    const imperialButton = 1;
    const secondButton = wrapper.find('input').at(imperialButton);
    // expect(wrapper).toMatchSnapshot();
    secondButton.simulate('click');
    expect(handleTemperatureUnitChangeSpy.calledOnce).toBe(true);
    expect(wrapper.state('selectedTemperatureUnit')).toBe('imperial');
    wrapper.unmount();
    // expect(wrapper).toMatchSnapshot();
  });

  it('should call handleForecastOptions', () => {
    const locationID = 'Greater London,GB';
    const handleForecastOptionsSpy = jest.fn(); //sinon.spy();
    const handleLocationChangeSpy = jest.fn(); // sinon.spy();
    const wrapper = shallow(<FindForecastForm
      handleForecastOptions={handleForecastOptionsSpy}
      handleLocationChange={handleLocationChangeSpy}
      {...mockProps}
    />);
    expect(wrapper.state('location_id')).toEqual('undefined');
    wrapper.find('select').at(0).simulate('change', { target: { value: locationID } });
    // expect(handleLocationChangeSpy).toHaveBeenCalled()
    expect(wrapper.state('location_id')).toEqual(locationID);
  });

});