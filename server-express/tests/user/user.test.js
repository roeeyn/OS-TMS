// Import the dependencies for testing

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

const db = require('../../models/index');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Users', () => {

  describe('GET /user', () => {

    before(() => {
      return db.sequelize.sync({ force: process.env.NODE_ENV == 'test' })
        .then(() => db.User.create({
          'firstName': 'Rodrigo',
          'lastName': 'Medina',
          'email': 'roeeyn@gmail.com',
          'password': '123secure',
          'role': 0
        }))
        .catch(err => console.log('ERROR: ', err));
    });

    it('should get the user with id 1', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/user/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          res.body.success.should.have.ownProperty('id');
          res.body.success.should.have.ownProperty('firstName');
          res.body.success.should.have.ownProperty('lastName');
          res.body.success.should.have.ownProperty('email');
          res.body.success.should.have.ownProperty('password');
          res.body.success.should.have.ownProperty('role');
          res.body.success.should.have.ownProperty('createdAt');
          res.body.success.should.have.ownProperty('updatedAt');
          done();
        });
    });

    it('should not get a single user record', (done) => {
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

    it('should get all users', (done) => {
      chai.request(app)
        .get(`/user`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          res.body.success.should.be.a('array');
          res.body.success[0].should.have.ownProperty('id');
          res.body.success[0].should.have.ownProperty('firstName');
          res.body.success[0].should.have.ownProperty('lastName');
          res.body.success[0].should.have.ownProperty('email');
          res.body.success[0].should.have.ownProperty('password');
          res.body.success[0].should.have.ownProperty('role');
          res.body.success[0].should.have.ownProperty('createdAt');
          res.body.success[0].should.have.ownProperty('updatedAt');
          done();
        });
    });

    after(() => {
      db.User.findByPk(1)
        .then(user => user ? user.destroy() : null)
        .catch(err => console.log(err));
    });

  });

  describe('POST /user', () => {

    it('should create a new user', (done) => {
      chai.request(app)
        .post('/user')
        .send({
          'firstName': 'Rodrigo',
          'lastName': 'Medina',
          'email': 'roeeyn@gmail.com',
          'password': '123secure',
          'role': 0
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          res.body.success.should.have.ownProperty('id');
          res.body.success.should.have.ownProperty('firstName');
          res.body.success.should.have.ownProperty('lastName');
          res.body.success.should.have.ownProperty('email');
          res.body.success.should.have.ownProperty('password');
          res.body.success.should.have.ownProperty('role');
          res.body.success.should.have.ownProperty('createdAt');
          res.body.success.should.have.ownProperty('updatedAt');
          done();
        });
    });
  });

  describe('PATCH /user', () => {

    before(() => {
      return db.sequelize.sync({ force: process.env.NODE_ENV == 'test' })
        .then(() => db.User.create({
          'firstName': 'Rodrigo',
          'lastName': 'Medina',
          'email': 'roeeyn@gmail.com',
          'password': '123secure',
          'role': 0
        }))
        .catch(err => console.log('ERROR: ', err));
    });

    it('should create a new user', (done) => {
      chai.request(app)
        .patch('/user/1')
        .send({
          'firstName': 'Rodriguinho'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          res.body.success.should.have.ownProperty('id');
          res.body.success.should.have.ownProperty('firstName');
          res.body.success.should.have.ownProperty('lastName');
          res.body.success.should.have.ownProperty('email');
          res.body.success.should.have.ownProperty('password');
          res.body.success.should.have.ownProperty('role');
          res.body.success.should.have.ownProperty('createdAt');
          res.body.success.should.have.ownProperty('updatedAt');
          done();
        });
    });

    after(() => {
      db.User.findByPk(1)
        .then(user => user ? user.destroy() : null)
        .catch(err => console.log(err));
    });

  });

  describe('DELETE /user', () => {

    before(() => {
      return db.sequelize.sync({ force: process.env.NODE_ENV == 'test' })
        .then(() => db.User.create({
          'firstName': 'Rodrigo',
          'lastName': 'Medina',
          'email': 'roeeyn@gmail.com',
          'password': '123secure',
          'role': 0
        }))
        .catch(err => console.log('ERROR: ', err));
    });

    it('should delete a user with id 1', (done) => {
      chai.request(app)
        .delete('/user/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.ownProperty('success');
          res.body.success.should.have.ownProperty('id');
          res.body.success.should.have.ownProperty('firstName');
          res.body.success.should.have.ownProperty('lastName');
          res.body.success.should.have.ownProperty('email');
          res.body.success.should.have.ownProperty('password');
          res.body.success.should.have.ownProperty('role');
          res.body.success.should.have.ownProperty('createdAt');
          res.body.success.should.have.ownProperty('updatedAt');
          done();
        });
    });

    after(() => {
      db.User.findByPk(1)
        .then(user => user ? user.destroy() : null)
        .catch(err => console.log(err));
    });

  });
});