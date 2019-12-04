
exports.up = async function (knex, Promise) {
	await knex.schema.createTable('group', table => {
		table.integer('id').primary()
		table.text('name')
	})
	await knex.raw("ALTER TABLE `todo`.`group` CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT")
	await knex.schema.createTable('user_group', table => {
		table.integer('user_id')
		table.integer('group_id')
		table.unique(['user_id', 'group_id'])
		table.foreign('group_id').references('id').inTable('group').onDelete('CASCADE').onUpdate('RESTRICT')
		table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE').onUpdate('RESTRICT')
	})
};

exports.down = async function (knex, Promise) {
	await knex.schema.dropTable('user_group')
	await knex.schema.dropTable('group')
};
