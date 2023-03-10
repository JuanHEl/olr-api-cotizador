"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Valor_Otros_Gastos = connection_1.default.define('Valor_Otros_Gastos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plazo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    instalacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    gps_anual: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    gastos_notariales: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.INTEGER
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
    },
    who_created: {
        type: sequelize_1.DataTypes.STRING
    },
    when_created: {
        type: sequelize_1.DataTypes.DATE
    },
    who_modified: {
        type: sequelize_1.DataTypes.STRING
    },
    when_modified: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Valor_Otros_Gastos;
