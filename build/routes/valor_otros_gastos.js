"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarJWT_1 = require("../middlewares/validarJWT");
const valor_otros_gastos_1 = require("../controllers/valor_otros_gastos");
const router = (0, express_1.Router)();
router.use(validarJWT_1.validarJWT);
router.get('/', valor_otros_gastos_1.getValoresOtrosGastos);
router.post('/', valor_otros_gastos_1.registerValoresOtrosGastos);
router.put('/', valor_otros_gastos_1.updateOtrosGastos);
router.get('/showcompleteOtrosGastos', valor_otros_gastos_1.showValorOtrosGastos);
exports.default = router;
