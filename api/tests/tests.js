require('chai').assert;
const expect = require('chai').expect;
require('chai').should();
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../src/app');
chai.use(chaiHttp)

describe("GET /files", function() {

  it("API returns all files", (done) => {
    chai.request(server)
    .get(`/files`)
    .end((err, response) => {
      response.body.should.have.property('files')
      response.body.files.should.be.a('array')
      response.body.files.forEach(b => {
        expect(b).to.include("test")
        expect(b).to.include(".csv")
      })
      done();
    })
  })
});

describe("GET /files/:file", () => {
  it("API call resolves successfully", (done) => {
    const file = "test1.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.should.have.status(200)
        done();
      })
  })
  it("API call resolves successfully", (done) => {
    const file = "test2.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.should.have.status(200)
        done();
      })
  })
  it("API call resolves successfully", (done) => {
    const file = "test3.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.should.have.status(200)
        done();
      })
  })

  it("API returns content from one file by name", (done) => {
    const file = "test1.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.body.should.be.a('string')
        done();
      })
  })
  it("API returns content from one file by name", (done) => {
    const file = "test6.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.body.should.be.a('string')
        done();
      })
  })
  it("API returns content from one file by name", (done) => {
    const file = "test15.csv"
    chai.request(server)
      .get(`/files/${file}`)
      .end((err, response) => {
        response.body.should.be.a('string')
        done();
      })
  })
})

describe("GET /files/data", () => {
  it("Returns formatted data correctly", (done) => {
    chai.request(server)
      .get(`/files/data`)
      .end((err, response) => {
        response.should.have.status(200)
        done();
      })
  })
 
})