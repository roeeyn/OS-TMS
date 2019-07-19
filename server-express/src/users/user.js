const db = require('../../models/index');

const createNewUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  db.User.create({ firstName, lastName, email, password, role })
    .then(result => res.send(result))
    .catch(error => res.send(error));

};

const getAllUsers = (req, res) => {
  db.User.findAll()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

module.exports = { createNewUser, getAllUsers };