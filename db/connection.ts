// import { Sequelize } from 'sequelize'
const { Sequelize } = require('sequelize');

const db = new Sequelize('olr_cotizador2023', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
})

export default db