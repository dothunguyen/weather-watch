import * as express from 'express';
import controller from './controller';

export const weatherv1 = express
  .Router()
  .get('/:city', controller.weatherByCity);