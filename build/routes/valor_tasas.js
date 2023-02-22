"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valor_tasas_1 = require("../controllers/valor_tasas");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.use(validarJWT_1.validarJWT);
router.post('/registerVT', valor_tasas_1.registerValoresTasa);
router.get('/tipo_activo', valor_tasas_1.getTasasByTipoActivo);
router.put('/', valor_tasas_1.updateTasas);
// router.get('/:tipo_activoPages', getTasasByTipoActivoPaginate)
exports.default = router;
