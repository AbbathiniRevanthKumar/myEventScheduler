"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("jobs", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      payload: {
        type: Sequelize.DataTypes.JSONB,
        allowNull: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      run_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      max_attempts: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 3
      },
      attempts: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
      },
      status: {
        type: Sequelize.DataTypes.ENUM("PENDING","RUNNING","COMPLETED","FAILED","DEAD_LETTER"),
        allowNull: false,
        defaultValue : "PENDING"
      },
      error: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
      completed_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Sequelize.DataTypes.NOW,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue : Sequelize.DataTypes.NOW
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('jobs');
    await queryInterface.dropEnum("enum_jobs_status");
  },
};
