import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import FindForecastForm from '../components/FindForecastForm/FindForecastForm';
import Forecast from '../components/Forecast/Forecast';

import styles from './WeatherPage.scss';
import { getCities, getWeatherData } from "../services/contentService";

const TEMPERATURE_UNITS_CELCIUS = 'metric';
// const TEMPERATURE_UNITS_FAHRENHEIHT = 'imperial';
const ERROR_FETCH_DATA = 'Error ferching forecast data.';

class WeatherPage extends Component {
  state = {
    locations: null,
    location_id: undefined,
    selectedTemperatureUnit: TEMPERATURE_UNITS_CELCIUS,
    forecasts: null,
    isLoading: false,
    error: null
  }

  handleForecastOptions = ({ location_id }) => {
    if (this.state.location_id === location_id) {
      return;
    }
    this.setState({ isLoading: true });
    getWeatherData(location_id, TEMPERATURE_UNITS_CELCIUS)
      .then(forecasts => {
        // console.log('Weather Data:', forecasts);
        this.setState({ location_id, forecasts, isLoading: false, error: null });
      })
      .catch(error =>
        this.setState({ isLoading: false, error: `${ERROR_FETCH_DATA}\n${error}` })
      );
  }

  handleTemperatureUnitChange = (selectedTemperatureUnit) => {
    if (this.state.selectedTemperatureUnit !== selectedTemperatureUnit) {
      this.setState({ selectedTemperatureUnit });
    }
  }

  componentDidMount() {
    if (!this.state.location) {
      getCities().then(locations => {
        if (!!locations) {
          this.setState({ locations })
        }
      });
    }
  }
  

  render() {
    const { isLoading, error, forecasts, locations, location_id, selectedTemperatureUnit } = this.state;
    return (
      <div className={styles['container']}>
        <h1>Weather Page</h1>
        <FindForecastForm
          locations={locations}
          handleForecastOptions={this.handleForecastOptions}
          handleTemperatureUnitChange={this.handleTemperatureUnitChange}
          locationID={location_id}
          selectedTemperatureUnit={selectedTemperatureUnit}
        />
        {isLoading &&
          <div>Loading...</div>
        }
        {!!error ?
          (<ul className={styles['error']}>
            <li>{error}</li>
          </ul>
          ) : (
            <div className={styles['forecasts-container']}>
              {
                (!!forecasts) &&
                <Forecast key={forecasts.location.id} data={forecasts} unit={selectedTemperatureUnit} />
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default CSSModules(WeatherPage, styles);