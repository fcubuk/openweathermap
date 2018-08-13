import axios from 'axios';
import { CITIES } from "../data/cities";
// import { CITIES } from "../data/city.list";
import { WEATHER_DATA_URL } from "./const";
import { getPrecipitation, getWindDirection, getWindDirectionDescription, } from './utils';

const ICON_IMG_URL_PREFIX = "http://openweathermap.org/img/w/";
const ICON_IMG_URL_SUFFIX = ".png";

export const getCities = () => {
  return new Promise((resolve, reject) => {
    resolve(CITIES)
      .catch(err => err);
  });
}

const getData = url => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => resolve(response.data))
      .catch(error => reject(`getData: ${error}`));
  });
}

const createDateTimeSlot = ({ dt_txt: date, main, weather, wind, rain = undefined }) => {
  try {
    let precipitationProbabilityInPercent = 0;
    if (!!rain && !!rain['3h'])
      precipitationProbabilityInPercent = Math.round(rain['3h']);

    const enhancedWeatherDescription = weather[0].description;
    const weatherTypeText = weather[0].main;
    const windDirection = getWindDirection(wind.deg);
    const temperatureC = Math.round(main.temp);
    const temperatureF = Math.round(main.temp * 1.8 + 32);
    const windSpeedKph = Math.round(wind.speed * 3.6);
    const windSpeedMph = Math.round(wind.speed * 3.6 / 1.6);
    const minTempC = main.temp_min;
    const maxTempC = main.temp_max;

    const timeSlot = {
      "enhancedWeatherDescription": enhancedWeatherDescription,
      "humidity": main.humidity,
      "iconURL": `${ICON_IMG_URL_PREFIX}${weather[0].icon}${ICON_IMG_URL_SUFFIX}`,
      "localDate": date.substr(0, 10),
      "precipitationProbabilityInPercent": precipitationProbabilityInPercent,
      "precipitationProbabilityText": getPrecipitation(precipitationProbabilityInPercent),
      "pressure": Math.round(main.pressure),
      "temperatureC": temperatureC,
      "temperatureF": temperatureF,
      "timeSlot": date.substr(11, 5),
      "weatherTypeText": weatherTypeText,
      "windDescription": getWindDirectionDescription(wind, 'metric', true),
      "windDirection": windDirection.windDirection,
      "windDirectionAbbreviation": windDirection.windDirectionAbbreviation,
      "windDirectionFull": windDirection.windDirectionFull,
      "windSpeedKph": windSpeedKph,
      "windSpeedMph": windSpeedMph,
      "minTempC": minTempC,
      "maxTempC": maxTempC
    }
    return timeSlot;
  } catch (e) {
    throw new Error(`Error from createDateTimeSlot() :${e}`);
  }
};

const summaryObj = {
  "enhancedWeatherDescription": null,
  "iconURL": null,
  "localDate": null,
  "maxTempC": -Infinity,
  "maxTempF": -Infinity,
  "minTempC": Infinity,
  "minTempF": Infinity,
  "timeSlot": null,
  "precipitationProbabilityInPercent": null,
  "precipitationProbabilityText": null,
  "weatherTypeText": null,
  "windDescription": null,
  "windDirection": null,
  "windDirectionAbbreviation": null,
  "windDirectionFull": null,
  "windSpeedKph": null,
  "windSpeedMph": null
};

const createDateSummary = (sum, d, isFirstDay) => {
  if (sum.maxTempC < d.maxTempC) {
    sum.maxTempC = Math.round(d.maxTempC);
    sum.maxTempF = Math.round(d.maxTempC * 1.8 + 32);
  }

  if (sum.minTempC > d.minTempC) {
    sum.minTempC = Math.round(d.minTempC);
    sum.minTempF = Math.round(d.minTempC * 1.8 + 32);
  }

  const hour = parseInt(d.timeSlot.substr(0, 2), 10);

  if ((hour >= 6 || hour <= 6) && !sum.enhancedWeatherDescription) {
    sum.enhancedWeatherDescription = d.enhancedWeatherDescription;
    sum.iconURL = d.iconURL;
    sum.localDate = d.localDate;
    sum.precipitationProbabilityInPercent = d.precipitationProbabilityInPercent;
    sum.precipitationProbabilityText = d.precipitationProbabilityText;
    sum.weatherTypeText = d.weatherTypeText;
    sum.windDescription = d.windDescription;
    sum.windDirection = d.windDirection;
    sum.windDirectionAbbreviation = d.windDirectionAbbreviation;
    sum.windDirectionFull = d.windDirectionFull;
    sum.windSpeedKph = d.windSpeedKph;
    sum.windSpeedMph = d.windSpeedMph;
    sum.timeSlot = d.timeSlot;
  }
  return sum;
}

const formatWeatherData = d => {
  const forecasts = {
    location: null,
    data: null
  }
  const forecast = [];
  let detailed = [];
  let dateTimeSlot = null;
  let summary = { ...summaryObj };
  let isFirstDay = true;
  // eslint-disable-next-line
  d.list.map((l, i) => {
    const hour = l.dt_txt.substr(11, 2);
    if (hour === '06') {
      forecast.push({ detailed, summary });
      summary = { ...summaryObj };
      detailed = [];
      isFirstDay = false;
    }
    dateTimeSlot = createDateTimeSlot(l);
    summary = createDateSummary(summary, dateTimeSlot, isFirstDay);
    detailed.push(dateTimeSlot)
  });

  if (detailed.length > 0) {
    forecast.push({ detailed, summary });
  }
  forecasts.location = d.city;
  forecasts.data = forecast;
  return forecasts;
}

export const getWeatherData = (id, unit) => {
  // const url = `${WEATHER_DATA_URL}&id=${id}&units=${unit}`;
  const url = `${WEATHER_DATA_URL}&q=${id}&units=${unit}`;
  // console.log(url)
  return getData(url)
    .then(data => {
      return formatWeatherData(data);
    })
    .catch(error => {
      throw new Error(`getWeatherData: ${error}`);
    });
}

// eslint-disable-next-line
const aa = {
  "options": {
    "location_id": "2643743",
    "day": "none",
    "locale": "en"
  },
  "data": {
    "forecasts": [
      {
        "detailed": {
          "lastUpdated": "2018-07-26T10:35:00+01:00",
          "reports": [
            {
              "enhancedWeatherDescription": "Sunny and a gentle breeze",
              "extendedWeatherType": 1,
              "feelsLikeTemperatureC": 35,
              "feelsLikeTemperatureF": 96,
              "gustSpeedKph": 30,
              "gustSpeedMph": 19,
              "humidity": 35,
              "localDate": "2018-07-26",
              "precipitationProbabilityInPercent": 3,
              "precipitationProbabilityText": "Low chance of precipitation",
              "pressure": 1011,
              "temperatureC": 32,
              "temperatureF": 89,
              "timeslot": "19:00",
              "timeslotLength": 1,
              "visibility": "Very Good",
              "weatherType": 1,
              "weatherTypeText": "Sunny",
              "windDescription": "A gentle breeze from the south",
              "windDirection": "S",
              "windDirectionAbbreviation": "S",
              "windDirectionFull": "Southerly",
              "windSpeedKph": 17,
              "windSpeedMph": 11
            }
          ]
        },
        "summary": {
          "lastUpdated": "2018-07-26T10:35:00+01:00",
          "report": {
            "enhancedWeatherDescription": "Thundery showers and a gentle breeze",
            "gustSpeedKph": 33,
            "gustSpeedMph": 20,
            "localDate": "2018-07-26",
            "lowermaxTemperatureC": null,
            "lowermaxTemperatureF": null,
            "lowerminTemperatureC": null,
            "lowerminTemperatureF": null,
            "maxTempC": 29,
            "maxTempF": 85,
            "minTempC": 20,
            "minTempF": 68,
            "mostLikelyHighTemperatureC": 31,
            "mostLikelyHighTemperatureF": 87,
            "mostLikelyLowTemperatureC": 19,
            "mostLikelyLowTemperatureF": 67,
            "pollenIndex": 1,
            "pollenIndexBand": "LOW",
            "pollenIndexIconText": "L",
            "pollenIndexText": "Low",
            "pollutionIndex": 4,
            "pollutionIndexBand": "MODERATE",
            "pollutionIndexIconText": "M",
            "pollutionIndexText": "Moderate",
            "precipitationProbabilityInPercent": 45,
            "precipitationProbabilityText": "Chance of precipitation",
            "sunrise": "05:15",
            "sunset": "20:58",
            "uppermaxTemperatureC": null,
            "uppermaxTemperatureF": null,
            "upperminTemperatureC": null,
            "upperminTemperatureF": null,
            "uvIndex": 2,
            "uvIndexBand": "LOW",
            "uvIndexIconText": "L",
            "uvIndexText": "Low",
            "weatherType": 28,
            "weatherTypeText": "Thundery Showers",
            "windDescription": "A gentle breeze from the west",
            "windDirection": "W",
            "windDirectionAbbreviation": "W",
            "windDirectionFull": "Westerly",
            "windSpeedKph": 20,
            "windSpeedMph": 12
          }
        }
      },
    ]
  }
}