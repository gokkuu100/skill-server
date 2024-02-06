// Knexfile.js

module.exports = {
    development: {
      client: 'mysql', // or your database client (e.g., 'mysql' or 'sqlite3')
      connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      },
    },
  };
  