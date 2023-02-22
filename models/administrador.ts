import { DataTypes } from 'sequelize'
import db from '../db/connection'

const Administrador = db.define('Administrador', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:'email'
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_administrador:{
        type: DataTypes.STRING
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
    }
})

export default Administrador