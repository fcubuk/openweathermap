import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import DaysCarouselButton from '../DaysCarouselButton/DaysCarouselButton';
import DayDetail from '../DayDetail/DayDetail';
import styles from './Forecast.scss';

class Forecast extends Component {

  state = {
    activeDayID: 0,
    activeSlot: 0
  }

  handleDayClick = activeDayID => {
    this.setState({ activeDayID })
  }

  render() {
    if (!this.props.data || !this.props.data.data) {
      return;
    }
    const data = this.props.data.data;
    const unit = this.props.unit;
    const { activeDayID } = this.state;
    return (
      <div>
        <div className={styles['carousel-container']}>
          {data.map((d, i) =>
            <DaysCarouselButton key={i} data={d.summary} isActiveDay={activeDayID === i} dayID={i} unit={unit} handleDayClick={this.handleDayClick} />
          )}
        </div>
        <div>
          <DayDetail key={activeDayID} data={data[activeDayID].detailed} unit={unit} activeTimeSlotID={null} />
        </div>
      </div>
    );

  }
}

export default CSSModules(Forecast, styles);