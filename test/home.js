process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Homepage', () => {
  it('it should be up', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res).to.be.html;
        expect(res.text).to.contain('Spoof');
        done();
      });
  });
});
