"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cotizacion_1 = require("../controllers/cotizacion");
const router = (0, express_1.Router)();
router.get('/', cotizacion_1.getCotizacion);
exports.default = router;
