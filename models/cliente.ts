import { DataTypes } from "sequelize";
import { db } from "../config";

const Cliente = db.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "email",
  },
  password: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_cliente: {
    type: DataTypes.STRING,
  },
});

export { Cliente };
