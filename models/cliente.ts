import { DataTypes } from 'sequelize'
import db from '../db/connection';

const Cliente = db.define('Cliente', {
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
        unique:true
    },
    telefono:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    tipo_cliente:{
        type: DataTypes.STRING
    }
})

export default Cliente