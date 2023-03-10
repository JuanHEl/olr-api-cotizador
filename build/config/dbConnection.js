"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// import { Sequelize } from 'sequelize'
const sequelize_1 = require("sequelize");
const DB_USER = process.env.DB_USER;
const DB_PORT = parseInt(process.env.DB_PORT);
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
// const db = new Sequelize(CONNECTION_URL);
const db = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    //logging: false
});
exports.db = db;
