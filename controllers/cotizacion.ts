import { Request, Response } from "express"
import { IDTOCotizacion } from "../interfaces/cotizacionInterfaces"
import { doCotizacion } from "../services/cotizacionServices"


export const getCotizacion = async (req: Request<{}, {}, IDTOCotizacion>, res: Response) => {
    const { montoArrendamientoFinal, comision, rentaMensual, valorInicialArrendamiento, valorResidualSinIva } = doCotizacion(req.body)
    if (!rentaMensual) return res.status(401).json({ msg: 'No se encuentra la renta' })
    res.status(200).json({ msg: 'En Cotización', data: { montoArrendamientoFinal, comision, rentaMensual, valorInicialArrendamiento, valorResidualSinIva } })
}
