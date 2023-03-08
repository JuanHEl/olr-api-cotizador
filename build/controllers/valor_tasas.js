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
exports.updateTasas = exports.getTasasByTipoActivo = exports.registerValoresTasa = exports.getTasasByTipoActivoPaginate = exports.getValoresTasas = void 0;
const sequelize_1 = require("sequelize");
const administrador_1 = __importDefault(require("../models/administrador"));
const valor_tasas_1 = __importDefault(require("../models/valor_tasas"));
const getValoresTasas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valoresTasas = yield valor_tasas_1.default.findAll();
        return res.json({
            data: valoresTasas
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.getValoresTasas = getValoresTasas;
const getTasasByTipoActivoPaginate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_activo } = req.body;
        const page = parseInt(req.body.page) || 1; // obtener el número de página desde la consulta
        const limit = parseInt(req.body.limit) || 10; // obtener el límite de resultados desde la consulta
        const offset = (page - 1) * limit;
        const { count, rows } = yield valor_tasas_1.default.findAndCountAll({
            where: {
                tipo_activo: {
                    [sequelize_1.Op.like]: `%${tipo_activo}%`,
                },
            },
            limit,
            offset,
        });
        const totalPages = Math.ceil(count / limit); // calcular el número total de páginas
        return res.status(200).json({
            dataTasas: rows,
            page,
            totalPages,
            totalResults: count,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
});
exports.getTasasByTipoActivoPaginate = getTasasByTipoActivoPaginate;
const registerValoresTasa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { plazo, tipo_activo, tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma } = req.body;
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
        const saveValorTasas = yield valor_tasas_1.default.create({
            plazo,
            tipo_activo,
            tasa_a,
            tasa_b,
            tasa_alfa,
            tasa_beta,
            tasa_gamma,
            who_created: admin.email,
            when_created: new Date()
        });
        if (!saveValorTasas) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            });
        }
        return res.status(201).json({
            msg: 'Registro del valor de la tasa exitoso'
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
});
exports.registerValoresTasa = registerValoresTasa;
const getTasasByTipoActivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { tipo_activo } = req.params;
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
        const rows = yield valor_tasas_1.default.findAll({
            where: {
                tipo_activo: {
                    [sequelize_1.Op.like]: `%${tipo_activo}%`,
                },
            },
            attributes: ['id', 'plazo', 'tasa_a', 'tasa_b', 'tasa_alfa', 'tasa_beta', 'tasa_gamma'], // Solo obtener las columnas que deseas mostrar
        });
        return res.status(200).json({
            tipo_activo,
            data: rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
});
exports.getTasasByTipoActivo = getTasasByTipoActivo;
const updateTasas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id, tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma } = req.body;
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
        const updatedRow = yield valor_tasas_1.default.update({
            tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma,
            who_modified: admin.email,
            when_modified: new Date()
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
exports.updateTasas = updateTasas;
