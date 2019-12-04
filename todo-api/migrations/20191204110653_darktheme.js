
exports.up = async function(knex, Promise) {
  await knex.schema.table('user', table => {
	  table.string('config')
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('user', table => {
	  table.dropColumn('config')
  })
};
