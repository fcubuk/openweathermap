import { forecast } from "../../test/fixtures/forecast";

const fakeCitiesData = [
  {
    "id": 5128638,
    "name": "New York",
    "country": "US",
    "coord": {
      "lon": -75.499901,
      "lat": 43.000351
    }
  },
  {
    "id": 2648110,
    "name": "Greater London",
    "country": "GB",
    "coord": {
      "lon": -0.16667,
      "lat": 51.5
    }
  },
  {
    "id": 5946768,
    "name": "Edmonton",
    "country": "CA",
    "coord": {
      "lon": -113.468712,
      "lat": 53.55014
    }
  }
];


export const getCities = () => {
  return new Promise(resolve => {
    resolve(fakeCitiesData);
  })
}

export const getWeatherData = (id, unit) => {
  return new Promise(resolve => {
    console.log('getWeatherData')
    resolve(forecast);
  });
}