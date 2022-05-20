const { Activity, conn } = require('../../src/db.js');
const { expect } = require('chai');

const activityDifiMal = {
    name: "Pescar",
    difficulty: "10",
    duration: "1 Hora",
    season: "Autumn"
}

const activitySeasonMal = {
    name: "Pescar",
    difficulty: "1",
    duration: "1 Hora",
    season: "Autummmm"
}

describe('Activity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validar Dificultad', () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe('Dificultad', () => {
      it('Deberia tirar un error si dificultad es diferente a (1,2,3,4 o 5)', (done) => {
        Activity.create(activityDifiMal)
          .then(() => done(new Error('La dificultad debe ser (1,2,3,4 o 5)')))
          .catch(() => done());
      });
    });
  });

  describe('Validar Season', () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe('Season', () => {
      it('Deberia tirar un error si season es diferente a (Summer, Autumn, Winter, Spring)', () => {
        Activity.create(activitySeasonMal)
            .then(() => done(new Error('Season debe ser (Summer, Autumn, Winter, Spring)')))
            .catch(() => done());
      });
    });
  });
});
