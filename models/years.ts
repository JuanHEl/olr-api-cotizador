import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Years = db.define('Years', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
    },
    who_deleted: {
        type: DataTypes.STRING
    },
    when_deleted:{
        type: DataTypes.DATE
    }
})

export default Years