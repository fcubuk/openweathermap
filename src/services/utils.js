const WIND_DIRECTION_DESCRIPTION = {
  NN: {
    deg: {
      min: 0, max: 11.25
    },
    desc: 'north'
  },
  NNE: {
    deg: {
      min: 11.25, max: 33.75
    },
    desc: 'north north east'
  },
  NE: {
    deg: {
      min: 33.75, max: 56.25
    },
    desc: 'north east'
  },
  ENE: {
    deg: {
      min: 56.25, max: 78.75
    },
    desc: 'east north east'
  },
  E: {
    deg: {
      min: 78.75, max: 101.25
    },
    desc: 'east'
  },
  ESE: {
    deg: {
      min: 101.25, max: 123.75
    },
    desc: 'east south east'
  },
  SE: {
    deg: {
      min: 123.75, max: 146.25
    },
    desc: 'south east'
  },
  SSE: {
    deg: {
      min: 146.25, max: 168.75
    },
    desc: 'south south east'
  },
  S: {
    deg: {
      min: 168.75, max: 191.25
    },
    desc: 'south'
  },
  SSW: {
    deg: {
      min: 191.25, max: 213.75
    },
    desc: 'south south west'
  },
  SW: {
    deg: {
      min: 213.75, max: 236.25
    },
    desc: 'south west'
  },
  WSW: {
    deg: {
      min: 236.25, max: 258.75
    },
    desc: 'west south west'
  },
  W: {
    deg: {
      min: 258.75, max: 281.25
    },
    desc: 'west'
  },
  WNW: {
    deg: {
      min: 281.25, max: 303.75
    },
    desc: 'west north west'
  },
  NW: {
    deg: {
      min: 303.75, max: 326.25
    },
    desc: 'north west'
  },
  NNW: {
    deg: {
      min: 326.25, max: 348.75
    },
    desc: 'north north west'
  },
  N: {
    deg: {
      min: 348.75, max: 360
    },
    desc: 'north'
  },
}

const WIND_SPEED_KM = {
  69: 'Strong winds',
  49: 'A fresh breeze',
  29: 'A moderate breeze',
  19: ' A gentle breeze',
  0: 'Light winds'
};

const PRECIPITATION = {
  89: 'Precipitation is expected',
  69: 'High chance of precipitation',
  29: 'Low chance of precipitation',
  1: 'Precipitation is not expected'
};

export const getPrecipitation = pre => {
  for (let val in PRECIPITATION) {
    if (val > pre) {
      return PRECIPITATION[val];
    }
  }
  return PRECIPITATION['0'];
}

export const getWindDirection = windDeg => {
  try {
    const windDirection = {
      "windDirection": null,
      "windDirectionAbbreviation": null,
      "windDirectionFull": null
    }
    for (let dir in WIND_DIRECTION_DESCRIPTION) {
      const { min, max } = WIND_DIRECTION_DESCRIPTION[dir].deg;
      if (windDeg >= min && windDeg <= max) {
        const direction = dir === 'NN' ? 'N' : dir;
        windDirection.windDirection = direction;
        windDirection.windDirectionAbbreviation = direction;
        windDirection.windDirectionFull = WIND_DIRECTION_DESCRIPTION[dir].desc;
        return windDirection;
      }
    }

    console.log('windDirection', windDirection);
    return windDirection;
  } catch (e) {
    throw new Error(`Erro from getWindDirection(): ${e}`);
  }
}

export const getWindDirectionDescription = (
  { deg: windDeg, speed: windSpeed },
  tempUnit,
  withDirection = true) => {

  try {
    const speed = tempUnit === 'imperial' ? Math.round(windSpeed / 1.6) : Math.round(windSpeed * 3.6);

    let windDesc = '';
    for (let ws in WIND_SPEED_KM) {
      if (speed > ws) {
        windDesc = WIND_SPEED_KM[ws];
      }
    }

    let directionDesc = getWindDirection(windDeg).windDirectionFull;
    return withDirection ? `${windDesc} from ${directionDesc.toLowerCase()}` : windDesc.toLowerCase();
  } catch (e) {
    throw new Error(`Error from getWindDirectionDescription(): ${e}`);
  }
}

/* const aaa = {
  N: {
    deg: {
      min: 348.75, max: 11.25
    },
    desc: 'north'
  },
  NNE: {
    deg: {
      min: 11.25, max: 33.75
    },
    desc: 'north north east'
  },
  NE: {
    deg: {
      min: 33.75, max: 56.25
    },
    desc: 'north east'
  },
  ENE: {
    deg: {
      min: 56.25, max: 78.75
    },
    desc: 'east north east'
  },
  E: {
    deg: {
      min: 78.75, max: 101.25
    },
    desc: 'east'
  },
  ESE: {
    deg: {
      min: 101.25, max: 123.75
    },
    desc: 'east south east'
  },
  SE: {
    deg: {
      min: 123.75, max: 146.25
    },
    desc: 'south east'
  },
  SSE: {
    deg: {
      min: 146.25, max: 168.75
    },
    desc: 'south south east'
  },
  S: {
    deg: {
      min: 168.75, max: 191.25
    },
    desc: 'south'
  },
  SSW: {
    deg: {
      min: 191.25, max: 213.75
    },
    desc: 'south south west'
  },
  SW: {
    deg: {
      min: 213.75, max: 236.25
    },
    desc: 'south west'
  },
  WSW: {
    deg: {
      min: 236.25, max: 258.75
    },
    desc: 'west south west'
  },
  W: {
    deg: {
      min: 258.75, max: 281.25
    },
    desc: 'west'
  },
  WNW: {
    deg: {
      min: 281.25, max: 303.75
    },
    desc: 'west north west'
  },
  NW: {
    deg: {
      min: 303.75, max: 326.25
    },
    desc: 'north west'
  },
  NNW: {
    deg: {
      min: 326.25, max: 348.75
    },
    desc: 'north north west'
  }
} */


/* 
old directions

{
  NNW: {
    deg: 348.75,
    desc: 'north north west'
  },
  NW: {
    deg: 326.25,
    desc: 'nort west'
  },
  WNW: {
    deg: 303.75,
    desc: 'west nort west'
  },
  W: {
    deg: 281.25,
    desc: 'west'
  },
  WSW: {
    deg: 258.75,
    desc: 'west south west'
  },
  SW: {
    deg: 236.25,
    desc: 'south west'
  },
  SSW: {
    deg: 213.75,
    desc: 'south south west'
  },
  S: {
    deg: 191.25,
    desc: 'south'
  },
  SSE: {
    deg: 168.75,
    desc: 'south south east'
  },
  SE: {
    deg: 146.25,
    desc: 'south east'
  },
  ESE: {
    deg: 123.75,
    desc: 'east south east'
  },
  E: {
    deg: 101.25,
    desc: 'east'
  },
  ENE: {
    deg: 78.75,
    desc: 'east nort east'
  },
  NE: {
    deg: 56.25,
    desc: 'nort east'
  },
  NNE: {
    deg: 33.75,
    desc: 'nort north east'
  },
  N: {
    deg: 11.25,
    desc: 'nort'
  },
};
*/