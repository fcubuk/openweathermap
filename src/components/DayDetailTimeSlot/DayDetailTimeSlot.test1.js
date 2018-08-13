/* 
* @jest-environment jsdom
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import DayDetailTimeSlot from './DayDetailTimeSlot';
import { forecast } from '../../test/fixtures/forecast';

const getMockProps = (data = 0, unit = 'metric', timeSlotID = 0, isTimeSlotDetailVisible = false, handleClickedTimeSlotButton = jest.fn()) => ({
  data,
  unit,
  timeSlotID,
  isTimeSlotDetailVisible,
  handleClickedTimeSlotButton,
});

const getData = (index = 0) => {
  return forecast.data[index].detailed[index];
}

describe('<DayDetailTimeSlot /> component', () => {
  test('should render without crashing without data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DayDetailTimeSlot />, div);
    ReactDOM.unmountComponentAtNode(div);
    const wrapper = shallow(<DayDetailTimeSlot />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render without crashing with data', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DayDetailTimeSlot {...getMockProps(getData())} />, div);
    ReactDOM.unmountComponentAtNode(div);
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render time correctly', () => {
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    const hourElement = wrapper.find('.time span').at(0);
    expect(hourElement.hasClass('hour')).toBe(true);
    expect(hourElement.text()).toBe('18');

    const minuteElement = wrapper.find('.time span').at(1);
    expect(minuteElement.hasClass('')).toBe(true);
    expect(minuteElement.text()).toBe('00');
  });

  test('should render weather icon correctly with alt atribute', () => {
    const altAttributeValue = 'Clear';
    const srcAttributeValue = 'http://openweathermap.org/img/w/01d.png';
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    const imgElement = wrapper.find('.icon-temperature img');
    expect(imgElement.prop('alt')).toBe(altAttributeValue);
    expect(imgElement.prop('src')).toBe(srcAttributeValue);
  });

  test('should render temperature correctly with metric and imperial units', () => {
    const imperial = 'imperial';
    let wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    expect(wrapper.find('.temperature span').text()).toBe('29°');
    wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData(), imperial)} />);
    expect(wrapper.find('.temperature span').text()).toBe('83°');
  });

  test('should render precipitation percentage correctly', () => {
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    expect(wrapper.find('.precipitation-percentage span').text()).toBe('0%');
  });

  test('should render wind direction and speed correctly for metric and imperial units', () => {
    const unitImperial = 'imperial';
    const windDirection = 'SW';
    const windSpeedMetric = '9 km/h';
    const windSpeedImperial = '5 m/h';
    let wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    let windContainerElement = wrapper.find('.wind-direction span');
    expect(windContainerElement.at(0).text()).toBe(windDirection);
    expect(windContainerElement.at(1).text()).toBe(windSpeedMetric);
    wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData(), unitImperial)} />);
    windContainerElement = wrapper.find('.wind-direction span');
    expect(windContainerElement.at(1).text()).toBe(windSpeedImperial);
  });

  test('should render details div with className="time-slot-details-container-hidden"', () => {
    const className = 'time-slot-details-container-hidden';
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} />);
    const detailsDiv = wrapper.find('li .time-slot-details-container-hidden');
    expect(detailsDiv.length).toBe(1)
  });

  test('should handle handleClickedTimeSlotButton correctly', () => {
    const handleClickedTimeSlotButtonSpy = jest.fn();
    let wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData())} handleClickedTimeSlotButton={handleClickedTimeSlotButtonSpy} />);
    wrapper.find('button').simulate('click');
    expect(handleClickedTimeSlotButtonSpy).toHaveBeenCalled();
    expect(handleClickedTimeSlotButtonSpy).toHaveBeenCalledWith(0);

    const timeSlotID = 2;
    wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData(2), 'metirc', timeSlotID)} handleClickedTimeSlotButton={handleClickedTimeSlotButtonSpy} />);
    wrapper.find('button').simulate('click');
    expect(handleClickedTimeSlotButtonSpy).toHaveBeenCalled();
    expect(handleClickedTimeSlotButtonSpy).toHaveBeenCalledWith(2);
  });

  test('should render details div visible correctly', () => {
    const timeSlotID = 2;
    const isTimeSlotDetailVisible = true;
    const wrapper = shallow(<DayDetailTimeSlot {...getMockProps(getData(timeSlotID), 'metric', timeSlotID, isTimeSlotDetailVisible)} />);
    const detailsDiv = wrapper.find('.time-slot-details-container-visible');
    expect(detailsDiv.length).toBe(1);

    const enhancedWeatherDescriptionText = "clear sky";
    const windDescriptionText = "Light winds from west south west";
    const descriptionText = enhancedWeatherDescriptionText + ' and ' + windDescriptionText;
    expect(detailsDiv.find('.description').text()).toBe(descriptionText);

    const humidityText = '44%';
    expect(detailsDiv.find('.humidity-pressure-container dd').at(0).text()).toBe(humidityText);

    const pressureText = '1017';
    expect(detailsDiv.find('.humidity-pressure-container dd').at(1).text()).toBe(pressureText);

    const precipitationProbabilityText = "Precipitation is not expected";
    expect(detailsDiv.find('.precipitation-probability').text()).toBe(precipitationProbabilityText);

    expect(detailsDiv.find('.wind-description span').text()).toBe(windDescriptionText);
  });
});