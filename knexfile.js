// Knexfile.js

module.exports = {
    development: {
      client: 'mysql2', // or your database client (e.g., 'mysql' or 'sqlite3')
      connection: {
        host: "localhost",
        user: "goku",
        password: "Goku100!",
        database: "skillcode",
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      },
    },
  };
  
//   npx knex migrate:make migration_name
