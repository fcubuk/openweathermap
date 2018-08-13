import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import DaysCarouselButton from '../DaysCarouselButton/DaysCarouselButton';
import DayDetail from '../DayDetail/DayDetail';
import styles from './DaysCarousel.scss';

class DaysCarousel extends Component {

  state = {
    activeDayID: 0,
    activeSlot: 0
  }

  handleDayClick = activeDayID => {
    this.setState({ activeDayID })
  }

  render() {
    if (!this.props.data.data) {
      return;
    }
    const data = this.props.data.data;
    const unit = this.props.unit;
    return (
      <div>
        <div className={styles['carousel-container']}>
          {data.map((d, i) =>
            <DaysCarouselButton key={i} data={d.summary} isActiveDay={this.state.activeDayID === i} dayID={i} unit={unit} handleDayClick={this.handleDayClick} />
          )}
        </div>
        {data.map((d, i) => {
          if (i === this.state.activeDayID) {
            return (<div key={i}>
              <DayDetail dayID={i} data={d.detailed} unit={unit} />
            </div>)
          } else {
            return null;
          }
        })}
      </div>
    );

  }
}

export default CSSModules(DaysCarousel, styles);