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
exports.getCotizacion = void 0;
const cotizacionServices_1 = require("../services/cotizacionServices");
const getCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { montoArrendamientoFinal, comision, rentaMensual, valorInicialArrendamiento, valorResidualSinIva } = (0, cotizacionServices_1.doCotizacion)(req.body);
    if (!rentaMensual)
        return res.status(401).json({ msg: 'No se encuentra la renta' });
    res.status(200).json({ msg: 'En Cotización', data: { montoArrendamientoFinal, comision, rentaMensual, valorInicialArrendamiento, valorResidualSinIva } });
});
exports.getCotizacion = getCotizacion;
