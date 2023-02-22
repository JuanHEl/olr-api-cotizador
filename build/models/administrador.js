"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Administrador = connection_1.default.define('Administrador', {
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
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipo_administrador: {
        type: sequelize_1.DataTypes.STRING
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    who_deleted: {
        type: sequelize_1.DataTypes.STRING
    },
    when_deleted: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Administrador;
