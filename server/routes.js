import {weatherv1} from './api/controllers/weather/router';

export default function routes(app) {
  app.use('/api/v1', weatherv1);
}
