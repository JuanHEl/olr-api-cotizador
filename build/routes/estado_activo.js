"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = require("../middlewares/validarJWT");
const estado_activo_1 = require("../controllers/estado_activo");
const router = (0, express_1.Router)();
router.use(validarJWT_1.validarJWT);
router.get('/', estado_activo_1.getEstadoActivo);
router.post('/', estado_activo_1.registerEstadoActivo);
router.put('/', estado_activo_1.updateEstadoActivo);
router.get('/show_all_estado_activo', estado_activo_1.showEstadoActivo);
router.put('/delete_estado_activo', estado_activo_1.deleteEstadoActivo);
exports.default = router;
