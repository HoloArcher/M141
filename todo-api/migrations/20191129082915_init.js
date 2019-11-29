
// const f = require('./datenbankscirpt.sql');


exports.up = async function (knex, Promise) {
	const fs = require('fs');
	var sql = fs.readFileSync('../datenbankscirpt.sql', { encoding: 'utf-8' })
	var el = sql.split(';')
	for( n in el ) {
		await knex.raw(el[n])
	}

};

exports.down = async function (knex, Promise) {

	await knex.schema.dropTable('todo')
	await knex.schema.dropTable('priority')
	await knex.schema.dropTable('user')
	await knex.schema.dropTable('status')
};
