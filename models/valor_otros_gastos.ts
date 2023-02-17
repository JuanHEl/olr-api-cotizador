import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Valor_Otros_Gastos = db.define('Valor_Otros_Gastos', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plazo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    intalacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gps_anual: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gastos_notariales:{
        type: DataTypes.INTEGER,
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
    },
    who_modified: {
        type: DataTypes.STRING
    },
    where_modified: {
        type: DataTypes.DATE
    }
})

export default Valor_Otros_Gastos