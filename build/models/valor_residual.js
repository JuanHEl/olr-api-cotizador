"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Valor_Residual = connection_1.default.define('Valor_Residual', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plazo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: {
            msg: 'El plazo ya existe'
        }
    },
    minimo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    maximo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    who_deleted: {
        type: sequelize_1.DataTypes.STRING
    },
    where_deleted: {
        type: sequelize_1.DataTypes.DATE
    },
    who_created: {
        type: sequelize_1.DataTypes.STRING
    },
    where_created: {
        type: sequelize_1.DataTypes.DATE
    },
    who_modified: {
        type: sequelize_1.DataTypes.STRING
    },
    where_modified: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.default = Valor_Residual;
