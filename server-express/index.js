const db = require('./models/index');
let app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const users = require('./src/users/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('All cool :)'));

app.route('/user')
  .post(users.createNewUser)
  .get(users.getAllUsers)

app.route('/user/:userId')
  .get(users.getUserById)
  .patch(users.editUserById)
  .delete(users.deleteByUserId)

db.sequelize.sync({ force: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server listening in ${port}, ENV = ${process.env.NODE_ENV}`)))
  .catch(err => {throw new Error(err)});

module.exports = app;