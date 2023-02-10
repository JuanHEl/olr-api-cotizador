"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente = connection_1.default.define('Cliente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: 'email'
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    tipo_cliente: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Cliente;
