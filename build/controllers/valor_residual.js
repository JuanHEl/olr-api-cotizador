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
Object.defineProperty(exports, "__esModule", { value: true });
exports.showValorValoresResiduales = exports.updateValoresResiduales = exports.registerValoresResiduales = exports.getValoresResiduales = void 0;
const valor_residual_1 = require("../models/valor_residual");
const administrador_1 = require("../models/administrador");
const getValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valoresResiduales = yield valor_residual_1.Valor_Residual.findAll();
        return res.json({
            data: valoresResiduales
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.getValoresResiduales = getValoresResiduales;
const registerValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { plazo, maximo, minimo } = req.body;
    try {
        const admin = yield administrador_1.Administrador.findOne({
            where: {
                id: (_a = req.authData) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            });
        }
        const saveValorResidual = yield valor_residual_1.Valor_Residual.create({
            plazo,
            minimo,
            maximo,
            who_created: admin.dataValues.id,
            when_created: new Date(),
            deleted: false
        });
        if (!saveValorResidual) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            });
        }
        return res.status(201).json({
            msg: 'Registro del valor residual exitoso'
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.registerValoresResiduales = registerValoresResiduales;
const updateValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id, plazo, minimo, maximo } = req.body;
    try {
        const admin = yield administrador_1.Administrador.findOne({
            where: {
                id: (_b = req.authData) === null || _b === void 0 ? void 0 : _b.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            });
        }
        const updatedRow = yield valor_residual_1.Valor_Residual.update({
            plazo, minimo, maximo,
            who_modified: admin.dataValues.email,
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
exports.updateValoresResiduales = updateValoresResiduales;
const showValorValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valoresResiduales = yield valor_residual_1.Valor_Residual.findAll({
            where: { deleted: false },
            attributes: ['id', 'plazo', 'minimo', 'maximo']
        });
        return res.json({
            data: valoresResiduales
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.showValorValoresResiduales = showValorValoresResiduales;
