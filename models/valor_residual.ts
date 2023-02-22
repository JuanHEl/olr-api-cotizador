import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Valor_Residual = db.define('Valor_Residual', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plazo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:{
            msg:'El plazo ya existe'
        }
    },
    minimo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maximo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
    },
    who_deleted: {
        type: DataTypes.STRING
    },
    where_deleted:{
        type: DataTypes.DATE
    },
    who_created: {
        type: DataTypes.STRING
    },
    where_created:{
        type: DataTypes.DATE
    },
    who_modified: {
        type: DataTypes.STRING
    },
    where_modified: {
        type: DataTypes.DATE
    }
})

export default Valor_Residual