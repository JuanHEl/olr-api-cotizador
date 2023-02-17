import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Estado_Activo = db.define('Estado_Activo', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado_activo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    who_deleted: {
        type: DataTypes.STRING
    },
    where_deleted:{
        type: DataTypes.DATE
    },
    who_add: {
        type: DataTypes.STRING
    },
    where_add:{
        type: DataTypes.DATE
    }
})

export default Estado_Activo