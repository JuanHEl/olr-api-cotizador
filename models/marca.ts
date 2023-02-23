import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Marca = db.define('Marca', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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

export default Marca