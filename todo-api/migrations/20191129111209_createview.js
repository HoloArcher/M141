
exports.up = async function (knex, Promise) {
	var query = 'CREATE VIEW `main` AS select `todo`.`id` AS `id`,`todo`.`text` AS `text`,`status`.`status` AS `status`,`user`.`fullname` AS `owner`,`priority`.`priority` AS `priority`,`todo`.`start_date` AS `start_date`,`todo`.`end_date` AS `end_date` from (((`todo` join `user` on((`user`.`id` = `todo`.`owner_id`))) join `status` on((`status`.`id` = `todo`.`status_id`))) join `priority` on((`priority`.`id` = `todo`.`priority_id`)));'
	
	await knex.raw(query)
};

exports.down = async function (knex, Promise) {
	await knex.raw('DROP VIEW `todo`.`main`')
};
