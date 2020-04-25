// @ts-nocheck

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const server = require('../../dist/bin/www');
// Our parent block
describe('Football Teams', () => {
  describe('/GET Teams', () => {
    it('it should GET all the Football Teams', (done) => {
      chai.request(server)
          .get('/teams')
          .end((err, res) => {
            (res).should.have.status(200);
            (res.body.status).should.be.a('boolean');
            (res.body.data.length).should.be.above(0);
            done();
          });
    });
  });
  describe('/POST teams', () => {
    it('it should POST a new Football Teams', (done) => {
      chai.request(server)
          .post('/teams')
          .end((err, res) => {
            (res).should.have.status(200);
            (res.body.status).should.be.a('boolean');
            done();
          });
    });
  });
});
