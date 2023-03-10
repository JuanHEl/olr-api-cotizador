// import { Sequelize } from 'sequelize'
import { Sequelize } from "sequelize";

const DB_USER = process.env.DB_USER as string;
const DB_PORT = parseInt(process.env.DB_PORT as string);
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_NAME = process.env.DB_NAME as string;
const DB_HOST = process.env.DB_HOST as string;

// const db = new Sequelize(CONNECTION_URL);

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  //logging: false
});

export { db };
