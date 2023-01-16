require('chai').assert;
const expect = require('chai').expect;
require('chai').should();
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../src/app');
chai.use(chaiHttp)

describe("GET /files/data", function() {

  it("API call resolves successfully", (done) => {
    chai.request(server)
    .get(`/files/data`)
    .end((err, response) => {
      response.should.have.status(200)
      done();
    })
  })

  it("API returns all files", (done) => {
    chai.request(server)
    .get(`/files/data`)
    .end((err, response) => {
      expect(response.body).to.be.a('array')
      response.body.forEach(file => {
        expect(file).to.have.property("file")
        expect(file).to.have.property("lines")
        expect(file.lines).to.be.a('array')
        expect(file.file).to.be.a('string')
        expect(file.file).to.include("test")
        expect(file.file).to.include(".csv")
      })
      done();
    })
  })

  it("API returns all files, skipping lines with errors", (done) => {
    chai.request(server)
    .get(`/files/data`)
    .end((err, response) => {
      expect(response.body).to.be.a('array')
      response.body.forEach(file => {
        file.lines.forEach(line => {
          expect(line).to.have.property("text")
          expect(line).to.have.property("number")
          expect(line).to.have.property("hex")


          expect(line.text).to.not.be.empty
          expect(line.number).to.not.be.empty
          expect(line.hex).to.not.be.empty
        })
      })
      done();
    })
  })
});