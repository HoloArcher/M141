var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
const bcrypt = require('../node_modules/bcrypt');
const jwt = require('jsonwebtoken');

router.get('/todo/users', async (req, res) => {
	let data = await knex('user').select('username');
	res.send(data);
})

router.get('/todo/priorities', async (req, res) => {
	let data = await knex('priority');
	res.send(data);
})
router.get('/todo/statuses', async (req, res) => {
	let data = await knex('status');
	res.send(data);
})

router.get('/todo', async (req, res) => {
	// may the gods have mercy
	var shittycode = await knex('main').map(el => {
		var obj = el
		// console.log(el.start_date);
		obj.start_date = (el.start_date) ? formated_date_to_US(new Date(el.start_date).toLocaleDateString()) : null
		obj.end_date = (el.end_date) ? formated_date_to_US(new Date(el.end_date).toLocaleDateString()) : null
		return obj
	})
	res.json(shittycode)
})


router.post('/todo', async (req, res) => {
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



router.put('/todo/:id', async (req, res) => {
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

router.delete('/todo/:id', async (req, res) => {
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

module.exports = router