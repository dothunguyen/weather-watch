'use strict'
import axios from 'axios';
import l from '../../common/logger';
import ProviderConfig from './provider-config.service';

class WeatherService {

  async weatherByCity(city) {
    l.info(`Weather information for ${city}`);
    let res = await this.weatherFromProvider(city);
    if (!res) {
      l.warn(`One provider down!!! using backup provider.`);
      ProviderConfig.reportProviderDown();
      res = await this.weatherFromProvider(city);
    }
    return res;
  }

  async weatherFromProvider(city) {
    const p = ProviderConfig.getProvider();
    const url = `${p.url}${city}`;
    try {
      const res = await axios.get(url);
      if (res) {
        return this[p.name](res);
      }
    } catch (err) {
      l.error(err.message);
    } 
  }

  weatherstack (res) {
    if (res.status === 200 && res.data) {
      const {
        current: {
          wind_speed,
          temperature
        }
      } = res.data;
      return { wind_speed, temperature_degrees: temperature };
    }
  }

  openweather (res) {
    if (res.status === 200 && res.data) {
      const {
        main: { temp },
        wind: { speed }
      } = res.data;
      // convert temp from K to C
      const tempincelcius = Math.ceil(temp - 273.15);
      return { wind_speed: speed, temperature_degrees: tempincelcius };
    }
  }
}

export default new WeatherService();