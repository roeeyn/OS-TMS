const { User } = require('../../models/index');
const { sendSuccess, sendError } = require('../lib/request-response');

const processResult = (responseObject, promise) =>
  promise
    .then(resultUser => sendSuccess(responseObject, resultUser))
    .catch(error => sendError(responseObject, error));

const createNewUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  processResult(res, User.create({ firstName, lastName, email, password, role }));
};

const getAllUsers = (req, res) => {
  processResult(res, User.findAll())
};

const executeAfterFindingById = (userId, fn, params) => new Promise((resolve, reject) => {
  return User.findByPk(userId)
    .then(user => {
      // user will be an instance of User and stores the content of the table entry
      // with id userId. if such an entry is not defined you will get null
      return user
        ? resolve(fn ? user[fn](params) : user)
        : reject("No user found");
    })
    .catch(error => reject(error));
});

const getUserById = (req, res) => {
  const { userId } = req.params;
  processResult(res, executeAfterFindingById(userId));
};

const editUserById = (req, res) => {
  const { userId } = req.params;
  const { editedProperties } = req.body;
  processResult(res, executeAfterFindingById(userId, 'update', editedProperties));
};

const deleteByUserId = (req, res) => {
  const { userId } = req.params;
  processResult(res, executeAfterFindingById(userId, 'destroy'));
};

module.exports = { createNewUser, getAllUsers, getUserById, editUserById, deleteByUserId };