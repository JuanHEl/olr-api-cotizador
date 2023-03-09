"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// import { Sequelize } from 'sequelize'
const sequelize_1 = require("sequelize");
const CONNECTION_URL = process.env.DB_CONNECTION_URL;
const db = new sequelize_1.Sequelize(CONNECTION_URL);
exports.db = db;
