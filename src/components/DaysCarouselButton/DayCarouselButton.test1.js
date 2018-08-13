/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import DaysCarouselButton from './DaysCarouselButton';
import { forecast } from '../../test/fixtures/forecast';

describe('<DaysCarouselButton /> component', () => {

  const getMockProps = (id, isActiveDay = true, unit = 'metric', dayID = 0) => {
    return {
      "data": {
        ...forecast.data[id].summary
      },
      dayID: dayID,
      handleDayClick: () => { },
      isActiveDay,
      unit
    }
  }

  it('should render and unmount without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DaysCarouselButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render nothing without data correctly', () => {
    const wrapper = shallow(<DaysCarouselButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(0)} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for active day with text Today', () => {
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(0)} />);
    const today = 'Today';
    expect(wrapper.find('button div span').text()).toBe(today);
  });

  it('should render correctly for active day with text Tonight', () => {
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(1)} />);
    const tonight = 'Tonight';
    expect(wrapper.find('button div span').text()).toBe(tonight);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with metric unit', () => {
    const tempHigh = '29°';
    const tempMin = '16°';
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(0)} />);
    expect(wrapper.find('li').at(0).text()).toBe(tempHigh);
    expect(wrapper.find('li').at(1).text()).toBe(tempMin);
  });

  it('should render correctly with imerial unit ', () => {
    const isActiveDay = true;
    const unit = 'imperial';
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(0, isActiveDay, unit)} />);
    const maxTempF = '84°';
    const minTempF = '61°';
    expect(wrapper.find('li').at(0).text()).toBe(maxTempF);
    expect(wrapper.find('li').at(1).text()).toBe(minTempF);
  });

  it('should render activeDay className="container-active" correctly', () => {
    const isActiveDay = true;
    const className = 'container-active';
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(0, isActiveDay)} />);
    expect(wrapper.find('button').hasClass(className)).toBe(true);
  });

  it('should render for not activeDay with className="container" correctly', () => {
    const className = 'container';
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(1, false, 'metric', 1)} />);
    expect(wrapper.find('button').hasClass(className)).toBe(true);
  });

  it('should handle button handleDayClick correctly', () => {
    const value = 2;
    const handleDayClickSpy = jest.fn();
    const wrapper = shallow(<DaysCarouselButton {...getMockProps(value, false, 'metric', 2)} handleDayClick={handleDayClickSpy} />);
    wrapper.find('button').simulate('click');
    expect(handleDayClickSpy).toHaveBeenCalledWith(value);
  });

});