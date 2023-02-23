"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administrador_1 = require("../controllers/administrador");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.post('/login', administrador_1.loginAdmin);
router.post('/', administrador_1.registerAdministrador);
router.use(validarJWT_1.validarJWT);
router.get('/', administrador_1.getAdmin);
router.put('/', administrador_1.updateAdmin);
router.put('/password', administrador_1.updateAdminPass);
router.put('/delete_admin', administrador_1.deleteOtherAdmin);
router.get('/show_all_admins', administrador_1.showAdmin);
exports.default = router;
