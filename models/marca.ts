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

export default Marca