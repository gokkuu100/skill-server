/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
    // Create a new table in the database
    return knex.schema.createTable('example_table', function (table) {
      table.increments('id');
      table.string('name');
      // Add other columns as needed
    });
  };
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function (knex) {
    // Drop the previously created table in the rollback
    return knex.schema.dropTable('example_table');
  };
  