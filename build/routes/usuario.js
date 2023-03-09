"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRouter = void 0;
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const usuarioRouter = (0, express_1.Router)();
exports.usuarioRouter = usuarioRouter;
usuarioRouter.get("/", usuario_1.getUsuarios);
