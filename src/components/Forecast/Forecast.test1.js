/* 
* @jest-environment jsdom
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Forecast from './Forecast';
import DayDetail from '../DayDetail/DayDetail';
import { forecast } from '../../test/fixtures/forecast';

const getMockProps = () => {
  return {
    data: forecast,
    unit: 'metric'
  }
}

// DayCarouselButton: isActiveDay={activeDayID === i} dayID={i} unit={unit} handleDayClick={this.handleDayClick}
// DayDetail: data={data[activeDayID].detailed} unit={unit} activeTimeSlotID={null}
describe('<Forecast /> component', () => {
  test('should render without data correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Forecast />, div);
    ReactDOM.unmountComponentAtNode(div);

    const wrapper = shallow(<Forecast />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with data correctly', () => {
    const wrapper = shallow(<Forecast data={forecast} unit={'metric'} activeTimeSlotID={0} />);
    expect(wrapper.find('DaysCarouselButton').length).toBe(6);
    expect(wrapper.containsMatchingElement(<DayDetail />)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

});