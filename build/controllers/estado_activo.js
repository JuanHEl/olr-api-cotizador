"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEstadoActivo = exports.showEstadoActivo = exports.updateEstadoActivo = exports.registerEstadoActivo = exports.getEstadoActivo = void 0;
const administrador_1 = __importDefault(require("../models/administrador"));
const estado_activo_1 = __importDefault(require("../models/estado_activo"));
const getEstadoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadoActivo = yield estado_activo_1.default.findAll();
        return res.status(200).json({
            data: estadoActivo
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.getEstadoActivo = getEstadoActivo;
const registerEstadoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { estado_activo } = req.body;
    try {
        const admin = yield administrador_1.default.findOne({
            where: {
                id: (_a = req.authData) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            });
        }
        const saveEstadoActivo = yield estado_activo_1.default.create({
            estado_activo,
            who_created: admin.email,
            when_created: new Date(),
            deleted: false
        });
        if (!saveEstadoActivo) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            });
        }
        return res.status(201).json({
            msg: 'Registro del estado del activo exitoso'
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.registerEstadoActivo = registerEstadoActivo;
const updateEstadoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id, estado_activo } = req.body;
    try {
        const admin = yield administrador_1.default.findOne({
            where: {
                id: (_b = req.authData) === null || _b === void 0 ? void 0 : _b.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            });
        }
        const updatedRow = yield estado_activo_1.default.update({
            estado_activo,
            who_modified: admin.email,
            when_modified: new Date(),
        }, { where: { id } });
        if (updatedRow[0] === 0) {
            return res.status(404).json({
                msg: `No se encontró la fila con el id ${id}`,
            });
        }
        return res.status(200).json({
            msg: "La fila se actualizó correctamente",
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error al actualizar la fila",
        });
    }
});
exports.updateEstadoActivo = updateEstadoActivo;
const showEstadoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadoActivo = yield estado_activo_1.default.findOne({
            where: { deleted: false },
            attributes: ['id', 'estado_activo']
        });
        return res.json({
            data: estadoActivo
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.showEstadoActivo = showEstadoActivo;
const deleteEstadoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.body;
    try {
        const admin = yield administrador_1.default.findOne({
            where: {
                id: (_c = req.authData) === null || _c === void 0 ? void 0 : _c.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            });
        }
        const eliminado = yield estado_activo_1.default.findOne({
            where: {
                id
            }
        });
        if (!eliminado) {
            return res.status(404).json({
                msg: 'No se pudo eliminar el estado del activo'
            });
        }
        yield eliminado.update({
            deleted: true,
            who_deleted: admin.email,
            when_deleted: new Date()
        });
        return res.status(201).json({
            msg: 'El estado del activo eliminado con éxito'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar la fila",
        });
    }
});
exports.deleteEstadoActivo = deleteEstadoActivo;
