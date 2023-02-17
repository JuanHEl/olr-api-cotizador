"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Estado_Activo = connection_1.default.define('Estado_Activo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado_activo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    delete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    who_deleted: {
        type: sequelize_1.DataTypes.STRING
    },
    where_deleted: {
        type: sequelize_1.DataTypes.DATE
    },
    who_add: {
        type: sequelize_1.DataTypes.STRING
    },
    where_add: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Estado_Activo;