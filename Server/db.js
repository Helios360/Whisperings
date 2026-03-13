require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env')
});
const { Sequelize, DataTypes } = require('sequelize');
const DB_NAME = process.env.POSTGRES_DB;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
});

const Article = sequelize.define("Articles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    },
}, { timestamps: true });

module.exports = { sequelize, Article };