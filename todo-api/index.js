const express = require('express')
const app = express()
const router = require('./routes/todos');
const knex = require('./db/knex');
const bcrypt = require('./node_modules/bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json())
app.use(cors())
app.use('/api/', auth, logger, router)

app.listen(3000, () => console.log("Listening on port 3000"))


app.post('/login/', logger, async function (req, res) {
  var { username, password } = req.body;
  try {
    var user = await knex.from('user')
      .where({ username })
    user = user[0]
    var db_password = user.password

  } catch (e) {
    res.status(403).send('invalid username or password')
  }
  if (user.length !== 0 && await bcrypt.compare(password, db_password)) {
    var tokendata = {
      id: user.id,
      username: user.username,
    }
    var token = jwt.sign(tokendata, process.env.JWT_TOKEN);
    var auth = 'Bearer ' + token
    res.send({ token: auth, user: tokendata }).status(200);
  } else {
    console.log('invalid username')
    res.status(403).send('invalid username or password');
  }
})


async function auth(req, res, next) {
  try {

    var head = req.headers.authorization;
    if (typeof head !== 'undefined') {
      var token = req.headers.authorization.split(' ')[1];
      req.token = token;
      try {
        req.decoded_token = jwt.verify(token, process.env.JWT_TOKEN)

      } catch (e) {
        res.send('invalid token').status(403)
      }
      next();
    }
    else {
      res.sendStatus(403)
    }
  } catch (e) {
    console.log(e);
  }
}

function logger(req, res, next) {
  // console.log(req);
  console.log(`${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()} | ${req.method} request on ${req.originalUrl}`);
  next();
}