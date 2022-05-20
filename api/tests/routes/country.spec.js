/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 'ARG',
  name: 'Argentina',
  image: 'estoesuntest',
  continent: 'South America',
  capital: 'Buenos Aires'
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /api/countries', () => {
    it('Deberia retornar un status 200', () =>
      agent.get('/api/countries').expect(200)
    );
  });
});

