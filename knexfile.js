module.exports = {
    development: {
      client: 'mysql2', 
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
