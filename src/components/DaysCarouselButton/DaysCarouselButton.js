import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from './DaysCarouselButton.scss';


class DaysCarouselButton extends Component {

  handleDayClick = e => {
    this.props.handleDayClick(this.props.dayID);
  }

  render() {
    const { dayID, data, isActiveDay, unit } = this.props;
    if (!data) {
      return;
    }
    const { localDate, iconURL, enhancedWeatherDescription, maxTempF, minTempF, timeSlot } = data;
    let { maxTempC: maxTemp, minTempC: minTemp } = data;
    if (unit !== 'metric') {
      maxTemp = maxTempF;
      minTemp = minTempF;
    }

    const dayName = moment(localDate).format('ddd');
    const dayOfMonth = moment(localDate).format('Do');
    const buttonClassName = isActiveDay ? 'container-active' : 'container';
    const time = moment(timeSlot, 'HH:mm').format('H');
    const todayTonight = dayID === 0 ? ((time >= 21 || time < 6) ? 'Tonight' : 'Today') : null;
    return (
      <button
        onClick={this.handleDayClick}
        className={styles[buttonClassName]}
      >

        {!todayTonight ?
          (<div><span>{dayName}</span> <span className={styles['day-of-month']}>{dayOfMonth}</span></div>)
          :
          (<div><span>{todayTonight}</span></div>)
        }
        <div className={styles['icon-temp-container']}>
          <img src={iconURL} alt={enhancedWeatherDescription} title={enhancedWeatherDescription} />
          <ul>
            <li className={styles['temperature-high']}>{maxTemp}&deg;</li>
            <li className={styles['temperature-low']}>{minTemp}&deg;</li>
          </ul>
        </div>
      </button>
    );
  }
}

export default CSSModules(DaysCarouselButton, styles);