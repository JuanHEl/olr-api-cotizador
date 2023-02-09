"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
// router.get('/:id',    getUsuario)
// router.post('/',      postUsuario)
// router.put('/:id',    putUsuario)
// router.delete('/:id', deleteUsuarios)
exports.default = router;
