const express = require('express')
const knex = require('./db/knex.js')
const app = express()
app.use(express.json())
const bcrypt = require('./node_modules/bcrypt');
const jwt = require('jsonwebtoken');

/* 
  priority codes
    0 niedrig
    1 normal
    2 hoch

  status codes
    0 Nicht begonnen, 
    1 in Bearbeitung, 
    2 Erledigt
    3 Wartet auf jemanden
    4 zurückgestellt
 */

function formated_date_to_US(el) {
  // converts mm/dd/yyy to yyyy-mm-dd
  const [month, day, year] = el.split("/");
  return `${year}-${month}-${day}`;
}
function formated_date_from_US(el) {
  // converts yy-mm-dd to mm/dd/yy
  const [year, month, day] = el.split("-");
  return `${month}/${day}/${year}`;
}


function kek() {
  let result = knex('main')
  // let results = knex('todo')
  //   .join('user', 'user.id', 'todo.owner_id')
  //   .join('status', 'status.id', 'todo.status_id')
  //   .join('priority', 'priority.id', 'todo.priority_id')
  //   .select('user.fullname as owner', 'text', ' todo.id', 'todo.start_date', 'todo.end_date', 'status.status as status', 'priority.priority as priority')
  return result;
}

async function return_owner_id(body) {
  /** 
   * takes: username in  "surname givenname"
   * returns: ID of user
   * if the user doesnt exist creates user und returns ID
   */
  var [surname, givenname] = body.split(' ')

  let owner_id = await knex('user').select('id').where('fullname', '=', body);
  if (!body) {
    owner_id = [{ id: 1 }];
  } else if (!owner_id.length) {
    owner_id = await knex('user').insert([{ surname: surname, givenname: givenname }]);
    owner_id = [{ id: owner_id[0] }];
  }
  return owner_id
}

app.get('/api/todo/users', async (req, res) => {
  let data = await knex('user').select('fullname', 'surname', 'id','givenname', 'username');
  res.send(data);
})

app.get('/api/todo/priorities', async (req, res) => {
  let data = await knex('priority');
  res.send(data);
})
app.get('/api/todo/statuses', async (req, res) => {
  let data = await knex('status');
  res.send(data);
})

app.get('/api/todo', async (req, res) => {
  // may the gods have mercy
  var shittycode = await kek().map(el => {    
    var obj = el
    // console.log(el.start_date);
    obj.start_date = (el.start_date)?formated_date_to_US(new Date(el.start_date).toLocaleDateString()): null
    obj.end_date = (el.end_date)?formated_date_to_US(new Date(el.end_date).toLocaleDateString()) : null
    return obj
  })
  res.json(shittycode)
})

app.post('/api/todo', async (req, res) => {
  // if end_date is not defined
  console.log('Post request');
  try {
    var owner_id = await return_owner_id(req.body.owner);
    let obj = {
      text: req.body.text,
      start_date: (req.body.start_date) ? new Date(formated_date_from_US(req.body.start_date)) : new Date(),
      end_date: (req.body.end_date) ? new Date(formated_date_from_US(req.body.end_date)) : null,
      status_id: req.body.status_id,
      priority_id: req.body.priority_id,
      owner_id: owner_id[0].id
    }
    let results = await knex('todo')
      .insert(obj)
    res.json(results)
  } catch (e) {
    console.error(e);
    res.status = e.status;
  }
})

app.put('/api/todo/:id', async (req, res) => {
  console.log('Put Request \n');
  try {
    var owner_id = await return_owner_id(req.body.owner)
    let results = await knex('todo')
      .update({
        text: req.body.text,
        start_date: (req.body.start_date) ? new Date(formated_date_from_US(req.body.start_date)) : null,
        end_date: (req.body.end_date) ? new Date(formated_date_from_US(req.body.end_date)) : null,
        status_id: req.body.status_id,
        priority_id: req.body.priority_id,
        owner_id: owner_id[0].id
      })
      .where('id', req.params.id)
    res.json(results)

  } catch (e) {
    res.status = e.status
    console.error(e)
  }
})

app.delete('/api/todo/:id', async (req, res) => {
  try {
    let results = await knex('todo')
      .where('id', req.params.id)
      .del()
    res.json(results)

  } catch (e) {
    res.status = e.status
    console.error(e)
  }
})


app.post('/api/login/', async function  (req, res) {
	var { username, password } = req.body;
	try {
		var user = await knex.from('users')
			.where({ username })
		user = user[0]
		var db_password = user.password
		user.password = null

	} catch (e) {
		res.status(403).send('invalid username or password')
	}
	if (user.length !== 0 && await bcrypt.compare(password, db_password)) {
		var tokendata = {
			id: user.id,
			username: user.username,
			name: user.name,
			role: user.role,
		}
		var token = jwt.sign(tokendata, process.env.JWT_TOKEN);
		var auth = 'Bearer ' + token
		res.send(auth).status(200);
	} else {
		res.status(403).send('invalid username or password');
	}
})

app.listen(3000, () => console.log("Listening on port 3000"))
