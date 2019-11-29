// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '8.0',
    connection: {
      host: "localhost",
      database: 'todo',
      user: 'root',
      password: 'admin',
      insecureAuth: true,
      port: 3306
    },
  },
  migrations: {
    tableName: 'migrations'
  },
};
