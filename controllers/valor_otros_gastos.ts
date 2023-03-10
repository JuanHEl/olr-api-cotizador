import { Request, Response } from "express"
import { Valor_Otros_Gastos } from "../models/valor_otros_gastos"
import { Administrador } from '../models/administrador';
import { IDTOValorOtrosGastos, IDTOValorOtrosGastosUpdate } from '../interfaces/valorOtrosGastosInterfaces';
import { calculateTotal } from "../services/calculateTotalServices";

export const getValoresOtrosGastos = async (req: Request, res: Response) => {
    try {
        const valoresOtrosGastos = await Valor_Otros_Gastos.findAll()
        return res.json({
            data: valoresOtrosGastos
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        })
    }
}

export const registerValoresOtrosGastos = async (req: Request<{}, {}, IDTOValorOtrosGastos>, res: Response) => {
    const { plazo, instalacion, gps_anual, gastos_notariales } = req.body
    try {
        const admin = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            })
        }
        const saveValorTasas = await Valor_Otros_Gastos.create({
            plazo,
            instalacion,
            gps_anual,
            gastos_notariales,
            total: calculateTotal({ instalacion, gps_anual, gastos_notariales }),
            who_created: admin.dataValues.email,
            when_created: new Date()
        })
        if (!saveValorTasas) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            })
        }
        return res.status(201).json({
            msg: 'Registro del valor de otros gastos es exitoso'
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const updateOtrosGastos = async (req: Request<{}, {}, IDTOValorOtrosGastosUpdate>, res: Response) => {
    const { id, gastos_notariales, gps_anual, instalacion } = req.body;
    try {
        const admin = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            })
        }
        const row = await Valor_Otros_Gastos.findOne({ where: { id } });
        if (!row) {
            return res.status(404).json({
                msg: `No se encontró la fila con el id ${id}`,
            });
        }

        const { instalacion: currentInstalacion, gps_anual: currentGPS, gastos_notariales: currentGastos } = row.dataValues;
        const updatedInstalacion = instalacion !== undefined ? instalacion : currentInstalacion;
        const updatedGPS = gps_anual !== undefined ? gps_anual : currentGPS;
        const updatedGastos = gastos_notariales !== undefined ? gastos_notariales : currentGastos;
        const total = calculateTotal({ instalacion: updatedInstalacion, gps_anual: updatedGPS, gastos_notariales: updatedGastos });

        const updatedRow = await Valor_Otros_Gastos.update(
            {
                gastos_notariales: updatedGastos,
                gps_anual: updatedGPS,
                instalacion: updatedInstalacion,
                total,
                who_modified: admin.dataValues.email,
                when_modified: new Date(),
            },
            { where: { id } }
        )

        if (updatedRow[0] === 0) {
            return res.status(404).json({
                msg: `No se encontró la fila con el id ${id}`,
            });
        }
        return res.status(200).json({
            msg: "La fila se actualizó correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al actualizar la fila",
        });
    }
}

export const showValorOtrosGastos = async (req: Request, res: Response) => {
    try {
        const valoresOtrosGastos = await Valor_Otros_Gastos.findAll({
            where: { deleted: false },
            attributes: ['id', 'plazo', 'instalacion', 'gps_anual', 'gastos_notariales', 'total']
        })
        return res.json({
            data: valoresOtrosGastos
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        })
    }
}
