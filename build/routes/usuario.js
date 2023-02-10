"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
router.get('/', usuario_1.getUsuarios);
// router.get('/:id',    getUsuario)
// router.post('/',      postUsuario)
// router.put('/:id',    putUsuario)
// router.delete('/:id', deleteUsuarios)
exports.default = router;
