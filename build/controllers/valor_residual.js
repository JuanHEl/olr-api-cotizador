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
exports.registerValoresResiduales = exports.getValoresResiduales = void 0;
const valor_residual_1 = __importDefault(require("../models/valor_residual"));
const cliente_1 = __importDefault(require("../models/cliente"));
const getValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valoresResiduales = yield valor_residual_1.default.findAll();
        res.json({
            data: valoresResiduales
        });
        console.log('Existe valor residual: ', valoresResiduales.length);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
    res.status(200).json({ msg: 'En Cotización', data: {} });
});
exports.getValoresResiduales = getValoresResiduales;
const registerValoresResiduales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { plazo, maximo, minimo } = req.body;
    try {
        const user = yield cliente_1.default.findOne({
            where: {
                id: (_a = req.authData) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        return res.json({ user });
        // const saveValorResidual = await Valor_Residual.create({
        //     plazo,
        //     minimo,
        //     maximo,
        //     who_add:'',
        //     deleted: false
        // })
        // if(!saveValorResidual){
        //     return res.status(404).json({
        //         msg: 'No se pudo crear el valor'
        //     })
        // }
        return res.status(201).json({
            msg: 'Cliente creado con éxito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
});
exports.registerValoresResiduales = registerValoresResiduales;
