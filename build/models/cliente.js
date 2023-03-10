"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const Cliente = config_1.db.define("Cliente", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: "email",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tipo_cliente: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.Cliente = Cliente;
