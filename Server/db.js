const { Sequelize } = require('sequelize');
const DB_NAME = process.env.POSTGRES_DB;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB,DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
});

module.export = sequelize;