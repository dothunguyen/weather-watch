import WeatherService from '../../services/weather.service'

class Controller {

  weatherByCity(req, res) {
    WeatherService.weatherByCity(req.params.city).then(r => {
      if (r)
        res.json(r);
      else   
        res.status(404).end();
    });  
  }
}

export default new Controller();