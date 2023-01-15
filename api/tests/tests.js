require('chai').assert;
const expect = require('chai').expect;
require('chai').should();
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../src/app');
chai.use(chaiHttp)

describe("GET /files/data", function() {

  it("API call resolves succesfully", (done) => {
    chai.request(server)
      .get(`/files/data`)
      .end((err, response) => {
        response.should.have.status(200)
        done();
      })
  });
  it("Returns the content from all files, skipping those with errors", (done) => {
    chai.request(server)
      .get(`/files/data`)
      .end((err, response) => {
        expect(response.body).to.be.a('array')
        response.body.forEach(b => {
          expect(b).to.has.property('file')
          expect(b).to.has.property('lines').to.be.a('array')
        })
        done();
      })
  });
  it("Returns all lines from each file, skipping empty columns ", (done) => {
    chai.request(server)
      .get(`/files/data`)
      .end((err, response) => {
        response.body.forEach(b => {
          b.lines.forEach(line => {
            const values = Object.values(line)
            values.forEach(v => v.should.not.be.empty)
          })
        })
        done();
      })
  });
});