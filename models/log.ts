import { DataTypes } from 'sequelize'
import db from '../db/connection';
import Administrador from "./administrador"

const Log = db.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    administrador_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Administrador,
          key: 'id'
        }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    old_register: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    new_register: {
      type: DataTypes.STRING,
      allowNull: true,
    }
})
Log.belongsTo(Administrador, { foreignKey: 'administrador_id' });

export default Log