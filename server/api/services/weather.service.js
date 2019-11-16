'use strict'
import axios from 'axios';
import { Cache } from "memory-cache";
import l from '../../common/logger';
import ProviderConfig from './provider-config.service';

const longTermCache = new Cache();

class WeatherService {

  async weatherByCity(city) {
    l.info(`Weather information for ${city}`);
    const cacheKey = `_long_term:${city}`;
    let res = await this.weatherFromProvider(city);
    if (!res) {
      l.warn(`One provider down!!! using backup provider.`);
      ProviderConfig.reportProviderDown();
      res = await this.weatherFromProvider(city);
      if (!res) {
        res = longTermCache.get(cacheKey);
      } else {
        this.cache(cacheKey, res);
      }
    } else {
      this.cache(cacheKey, res);
    }
    return res;
  }

  async weatherFromProvider(city) {
    const p = ProviderConfig.getProvider();
    if (p && p.url) {
      const url = `${p.url}${city}`;
      try {
        const res = await axios.get(url);
        if (res) {
          return this[p.name](res);
        }
      } catch (err) {
        l.error(err.message);
      } 
    } else {
      l.error(`Provides are not available`);
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

  cache (key, res) {
    try {
      longTermCache.put(key, res, parseInt(process.env.LONGTERM_CACHED_EXPIRE_IN));
    } catch (err) {
      l.error(err.message);
    } 
  }
}

export default new WeatherService();