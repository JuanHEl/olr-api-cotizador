"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Valor_Tasas = connection_1.default.define('Valor_Tasas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_activo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    plazo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tasa_a: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tasa_b: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tasa_alfa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tasa_beta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    tasa_gamma: {
        type: sequelize_1.DataTypes.INTEGER,
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
    },
    who_modified: {
        type: sequelize_1.DataTypes.STRING
    },
    where_modified: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Valor_Tasas;
