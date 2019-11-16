import l from '../../common/logger';

class WeatherService {

  async weatherByCity(city) {
    l.info(`Weather information for ${city}`);
    return { wind_speed: 20, temperature_degrees: 29 };
  }
}

export default new WeatherService();