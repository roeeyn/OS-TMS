const { User } = require('../../models/index');
const { sendSuccess, sendError } = require('../lib/request-response');

const createNewUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  User.create({ firstName, lastName, email, password, role })
    .then(newUser => sendSuccess(res, newUser))
    .catch(error => sendError(res, error));

};

const getAllUsers = (req, res) => {
  User.findAll()
    .then(users => sendSuccess(res, users))
    .catch(error => sendError(res, error));
};

const getUserById = (req, res) => {

  const { userId } = req.params;

  User.findByPk(userId)
    .then(user => {
      // project will be an instance of Project and stores the content of the table entry
      // with id 123. if such an entry is not defined you will get null
      user ? sendSuccess(res, user) : sendError(res, "No user found");
    })
    .catch(error => sendError(res, error));
};

module.exports = { createNewUser, getAllUsers, getUserById };