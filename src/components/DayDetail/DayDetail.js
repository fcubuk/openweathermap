import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import DayDetailTimeSlot from '../DayDetailTimeSlot/DayDetailTimeSlot';
import styles from './DayDetail.scss';

class DayDetail extends Component {
  state = {
    activeTimeSlotID: this.props.activeTimeSlotID
  }

  handleClickedTimeSlotButton = activeTimeSlotID => {
    if (this.state.activeTimeSlotID === activeTimeSlotID) {
      this.setState({ activeTimeSlotID: null })
    } else {
      this.setState({ activeTimeSlotID })
    }
  }

  render() {
    const { data, unit } = this.props;
    if (!data) {
      return;
    }
    const activeTimeSlotID = this.state.activeTimeSlotID
    return (
      <div className={styles['container']}>
        {data.map((d, i) =>
          <DayDetailTimeSlot
            key={i}
            data={d}
            unit={unit}
            timeSlotID={i}
            isTimeSlotDetailVisible={i === activeTimeSlotID}
            handleClickedTimeSlotButton={this.handleClickedTimeSlotButton}
          />)}
      </div>
    );
  }
}

export default CSSModules(DayDetail, styles);