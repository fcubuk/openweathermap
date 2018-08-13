import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './FindForecastForm.scss';

const ERROR_SELECT_LOCATION = 'Please, select a location to display forecast.';

class FindForecastForm extends Component {
  state = {
    location_id: !this.props.locationID ? this.props.locationID : 'undefined',
    selectedTemperatureUnit: !this.props.selectedTemperatureUnit ? this.props.selectedTemperatureUnit : 'metric',
    error: null
  }

  handleLocationChange = e => {
    const location_id = e.target.value;
    if (location_id === 'undefined') this.setState({ location_id, error: ERROR_SELECT_LOCATION });
    else this.setState({ location_id, error: null });
  }

  handleTemperatureUnitChange = e => {
    if (!e.target.value)
      return;
    const selectedTemperatureUnit = e.target.value;
    this.setState({ selectedTemperatureUnit });
    if (this.state.location_id !== undefined) {
      this.props.handleTemperatureUnitChange(selectedTemperatureUnit);
    }

  }

  handleForecastOptions = () => {
    const { error, location_id } = this.state;

    if (location_id === undefined) {
      this.setState({ error: ERROR_SELECT_LOCATION });
      return;
    }
    if (!error) {
      this.props.handleForecastOptions({ ...this.state });
    }
  }

  render() {
    const locations = this.props.locations;
    const { error, location_id, selectedTemperatureUnit } = this.state;
    return (
      <div className={styles['form-container']}>
        {!!error && <div className={styles['error']}>{error}</div>}
        <div className={styles['form']}>
          <select
            className={styles['select-city']}
            value={location_id}
            onChange={this.handleLocationChange}>
            <option value="undefined">Select location</option>
            {!!locations &&
              locations.map((location, i) =>
                <option key={i} value={`${location.name},${location.country}`}>{location.name}, {location.country}</option>
              )}
          </select>
          <div className={styles['switch-field']} onClick={this.handleTemperatureUnitChange}>
            <input type="radio" id="switch_left" name="unit" value="metric"
              defaultChecked={selectedTemperatureUnit === 'metric'}
            />
            <label htmlFor="switch_left" title="Celcius">C</label>
            <input type="radio" id="switch_right" name="unit" value="imperial"
              defaultChecked={selectedTemperatureUnit === 'imperial'}
            />
            <label htmlFor="switch_right" title="Fahrenheit">F</label>
          </div>
          <button onClick={this.handleForecastOptions}>Show</button>
        </div>
      </div>
    );
  }
}
/*                 <option key={i} value={location.id}>{location.name}, {location.countrys}</option>
<option key={i} value={`${location.name},${location.country}`}>{location.name}, {location.country}</option>
*/
export default CSSModules(FindForecastForm, styles);