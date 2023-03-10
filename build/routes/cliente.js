"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../controllers/cliente");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.post('/login', cliente_1.loginCliente);
router.use(validarJWT_1.validarJWT);
router.get('/', cliente_1.getCliente);
router.post('/', cliente_1.registerCliente);
exports.default = router;
