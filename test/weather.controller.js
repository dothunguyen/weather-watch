import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Weather', () => {
  it('should get weather of Melbourne', () =>
    request(Server)
      .get('/api/v1/melbourne')
      .expect('Content-Type', /json/)
      .then(r => {
        var body = r.body;
        expect(body).to.be.an.an('object')
        expect(body).has.property('wind_speed').equal(20);
        expect(body).has.property('temperature_degrees').equal(29);
      }));
});