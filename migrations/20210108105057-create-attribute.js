"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Attributes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Attributes",
          key: "id"
        },
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references: {
          model: "Statuses",
          key: "id"
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        unique: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      created_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      updated_by: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Attributes");
  }
};
