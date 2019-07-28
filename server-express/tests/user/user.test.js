// Import the dependencies for testing

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

const db = require('../../models/index');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users", () => {

  before(done => {
    db.User.create({
      "firstName": "Rodrigo",
      "lastName": "Medina",
      "email": "roeeyn@gmail.com",
      "password": "123secure",
      "role": 0
    }).then(() => done());
  });

  describe('GET /user', () => {
    // Test to get single student record
    it("should get the student with id 1", (done) => {
      const id = 1;
      chai.request(app)
        .get(`/user/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          done();
        });
    });

    // Test to get single student record
    it("should not get a single student record", (done) => {
      const id = 50;
      chai.request(app)
        .get(`/user/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('error');
          done();
        });
    });
  });

  describe("POST /user", () => {
    // Test to get all students record
    it("should create a new user", (done) => {
      chai.request(app)
        .post('/user')
        .send({
          "firstName": "Rodrigo",
          "lastName": "Medina",
          "email": "roeeyn@gmail.com",
          "password": "123secure",
          "role": 0
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          done();
        });
    });
  });
});