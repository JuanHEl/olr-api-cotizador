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
        type: DataTypes.INTEGER
    },
    tasa_b: {
        type: DataTypes.INTEGER
    },
    tasa_alfa: {
        type: DataTypes.INTEGER
    },
    tasa_beta: {
        type: DataTypes.INTEGER
    },
    tasa_gamma:{
        type: DataTypes.INTEGER
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    who_deleted: {
        type: DataTypes.STRING
    },
    when_deleted:{
        type: DataTypes.DATE
    },
    who_created: {
        type: DataTypes.STRING
    },
    when_created:{
        type: DataTypes.DATE
    },
    who_modified: {
        type: DataTypes.STRING
    },
    when_modified: {
        type: DataTypes.DATE
    }
})

export default Valor_Tasas