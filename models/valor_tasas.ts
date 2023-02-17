import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Valor_Tasas = db.define('Valor_Tasas', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_activo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    plazo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tasa_a: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tasa_b: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tasa_alfa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tasa_beta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tasa_gamma:{
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

export default Valor_Tasas