'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assessments', 'mentorId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Mentors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessments', 'mentorId');
  },
};
