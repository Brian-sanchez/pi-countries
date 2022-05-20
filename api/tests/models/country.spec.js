const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validar Nombre del Model Country', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('Nombre', () => {
      it('Deberia tirar un error si name esta vacio', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Deberia funcionar cuando tiene un nombre valido', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});
