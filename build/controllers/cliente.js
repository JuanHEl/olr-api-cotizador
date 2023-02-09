"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loginCliente = exports.registerCliente = exports.getCliente = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield cliente_1.default.findAll();
    res.json({ msg: 'Cliente', cliente });
});
exports.getCliente = getCliente;
const registerCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, telefono } = req.body;
    try {
        const clienteExist = yield cliente_1.default.findOne({
            where: {
                email
            }
        });
        if (clienteExist) {
            return res.status(404).json({
                msg: 'Ya existe un usuario con el email: ' + email
            });
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        const saveCliente = yield cliente_1.default.create({
            nombre,
            email,
            telefono,
            password: hash
        });
        if (!saveCliente) {
            return res.status(404).json({
                msg: 'No se pudo crear el cliente: ' + nombre
            });
        }
        return res.status(201).json({
            msg: 'Cliente creado con éxito'
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.registerCliente = registerCliente;
const loginCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const cliente = yield cliente_1.default.findOne({
            where: {
                email
            }
        });
        if (!cliente) {
            res.status(404).json({
                msg: 'No se encuentra registro del cliente'
            });
        }
        const passwordValid = bcrypt_1.default.compare(password, cliente.password);
        if (!passwordValid) {
            res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: cliente.id }, process.env.SECRET_JWT);
        res.status(201).json({
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            tipo_cliente: cliente.tipo_cliente,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});
exports.loginCliente = loginCliente;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        // pendiente
        res.status(201).json({
            msg: 'Se ha cerrado la sesión con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});
exports.logout = logout;
