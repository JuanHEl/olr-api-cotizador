"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    // Pendiente
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'El token es necesario para la petición'
        });
    }
    try {
        const extraccion = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
module.exports = {
    validarJWT
};
