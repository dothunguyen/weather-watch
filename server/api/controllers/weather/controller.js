import WeatherService from "../../services/weather.service";
import { Cache } from "memory-cache";
import l from "../../../common/logger";

const cache = new Cache();

class Controller {
  weatherByCity(req, res) {
    
    const city = req.params.city;
    const cached = cache.get(city);

    if (cached) {
      res.json(cache.get(city));
    } else {
      WeatherService.weatherByCity(req.params.city).then(r => {
        if (r) {
          try {
            cache.put(city, r, parseInt(process.env.CACHED_EXPIRE_IN));
          } catch (err) {
            l.error(`caching failed. ${err.message}`);
          }
          res.json(r);
        } else res.status(404).end();
      });
    }
  }
}

export default new Controller();
