// import { Sequelize } from 'sequelize'
import { Sequelize } from "sequelize";

const CONNECTION_URL = process.env.DB_CONNECTION_URL as string;

const db = new Sequelize(CONNECTION_URL);

export { db };
