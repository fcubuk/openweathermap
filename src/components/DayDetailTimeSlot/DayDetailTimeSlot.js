import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './DayDetailTimeSlot.scss';


const WIND_SPEED_UNIT_KM = 'km/h';
const WIND_SPEED_UNIT_M = 'm/h';

class DayDetailTimeSlot extends Component {

  handleClickedTimeSlotButton = () => {
    this.props.handleClickedTimeSlotButton(this.props.timeSlotID);
  }

  render() {
    const { unit, isTimeSlotDetailVisible, data } = this.props;
    if (!data) {
      return;
    }
    const { enhancedWeatherDescription,
      humidity,
      iconURL,
      precipitationProbabilityInPercent,
      precipitationProbabilityText,
      pressure,
      temperatureC,
      temperatureF,
      timeSlot,
      weatherTypeText,
      windDescription,
      windDirectionAbbreviation,
      windSpeedKph,
      windSpeedMph } = data;

    let temp = temperatureC;
    let windSpeed = windSpeedKph
    let windSpeedUnit = WIND_SPEED_UNIT_KM;
    if (unit === 'imperial') {
      temp = temperatureF;
      windSpeed = windSpeedMph;
      windSpeedUnit = WIND_SPEED_UNIT_M;
    }
    const weatherDescription = `${enhancedWeatherDescription} and ${windDescription}`;
    const timeSlotDetailVisibleStyle = isTimeSlotDetailVisible ? 'time-slot-details-container-visible' : 'time-slot-details-container-hidden';
    return (
      <li className={styles['time-slot-container']}>
        <button className={styles['time-slot-button']} onClick={this.handleClickedTimeSlotButton}>
          <div className={styles['time']}>
            <span className={styles['hour']}>{timeSlot.substr(0, 2)}</span>
            <span>{timeSlot.substr(3, 2)}</span>
          </div>
          <div className={styles['icon-temperature']}>
            <img src={iconURL} alt={weatherTypeText} />
            <div className={styles['temperature']}>
              <span>{temp}&deg;</span>
            </div>
          </div>
          <div className={styles['precipitation-percentage']}>
            <span>{precipitationProbabilityInPercent}%</span>
          </div>
          <div className={styles['wind-direction']}>
            <span>{windDirectionAbbreviation}</span><br />
            <span>{windSpeed} {windSpeedUnit}</span>
          </div>
        </button>
        <div className={styles[timeSlotDetailVisibleStyle]}>
          <div className={styles['description']}>
            <span>{weatherDescription}</span>
          </div>
          <div className={styles['humidity-pressure-container']}>
            <dl>
              <dt>Humidity</dt>
              <dd>{humidity}%</dd>
              <dt>Pressure</dt>
              <dd>{pressure}</dd>
            </dl>
          </div>
          <div className={styles['precipitation-probability']}>
            <span>{precipitationProbabilityText}</span>
          </div>
          <div className={styles['wind-description']}>
            <span>{windDescription}</span>
          </div>
        </div>
      </li>
    );
  }
}

export default CSSModules(DayDetailTimeSlot, styles);

/* 
enhancedWeatherDescription:"broken clouds"
humidity:73
iconURL:"http://openweathermap.org/img/w/04d.png"
localDate:"2018-07-30"
maxTempC:21.34
minTempC:21.26
precipitationProbabilityInPercent:0
precipitationProbabilityText:"Precipitation is not expected"
pressure:1016
temperatureC:21
temperatureF:70
timeSlot:"15:00"
weatherTypeText:"Clouds"
windDescription:" A gentle breeze from south"
windDirection:"S"
windDirectionAbbreviation:"S"
windDirectionFull:"south"
windSpeedKph:20
windSpeedMph:13

*/