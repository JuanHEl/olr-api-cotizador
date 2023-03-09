import { DataTypes } from "sequelize";
import { db } from "../config";

const Estado_Activo = db.define("Estado_Activo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estado_activo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  who_deleted: {
    type: DataTypes.STRING,
  },
  when_deleted: {
    type: DataTypes.DATE,
  },
  who_created: {
    type: DataTypes.STRING,
  },
  when_created: {
    type: DataTypes.DATE,
  },
  who_modified: {
    type: DataTypes.STRING,
  },
  when_modified: {
    type: DataTypes.DATE,
  },
});

export default Estado_Activo;
