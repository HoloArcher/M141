
exports.up = async function (knex, Promise) {

	await knex.schema.alterTable('user', table => {
		table.string('username')
		table.string('password')

	})
};

exports.down = async function (knex, Promise) {
	await knex.schema.alterTable('user', table => {
		table.dropColumn('username')
		table.dropColumn('password')
	})
};
