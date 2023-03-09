"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const administrador_1 = __importDefault(require("./administrador"));
const Log = config_1.db.define("Log", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    administrador_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: administrador_1.default,
            key: "id",
        },
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    old_register: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    new_register: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
Log.belongsTo(administrador_1.default, { foreignKey: "administrador_id" });
exports.default = Log;
