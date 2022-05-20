/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

const agent = session(app);
const activity = {
    name: 'Pescar',
    difficulty: '4',
    duration: '3 Horas',
    season: 'Autumn'
};

describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Activity.sync({ force: true })
    .then(() => Activity.create(activity)));
  describe('GET /api/activities', () => {
    it('Deberia retornar un status 200', () =>
      agent.get('/api/activities').expect(200)
    );
  });
});