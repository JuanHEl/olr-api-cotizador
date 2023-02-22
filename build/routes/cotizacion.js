"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cotizacion_1 = require("../controllers/cotizacion");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.use(validarJWT_1.validarJWT);
router.get('/', cotizacion_1.getCotizacion);
exports.default = router;
