import { Request, Response } from "express"
import { Op } from 'sequelize'
import { IDTOGetTasasByTipoActivo, IDTOValorTasas, IDTOValorTasasUpdate } from '../interfaces/valorTasasInterfaces';
import { Administrador } from "../models/administrador";
import { Valor_Tasas } from "../models/valor_tasas"


export const getValoresTasas = async (req: Request, res: Response) => {
    try {
        const valoresTasas = await Valor_Tasas.findAll()
        return res.json({
            data: valoresTasas
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        })
    }
}

export const getTasasByTipoActivoPaginate = async (req: Request<IDTOGetTasasByTipoActivo>, res: Response) => {
    try {
        const { tipo_activo } = req.body;
        const page = parseInt(req.body.page as string) || 1; // obtener el número de página desde la consulta
        const limit = parseInt(req.body.limit as string) || 10; // obtener el límite de resultados desde la consulta

        const offset = (page - 1) * limit;

        const { count, rows } = await Valor_Tasas.findAndCountAll({
            where: {
                tipo_activo: {
                    [Op.like]: `%${tipo_activo}%`,
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
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

export const registerValoresTasa = async (req: Request<{}, {}, IDTOValorTasas>, res: Response) => {
    const { plazo, tipo_activo, tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma } = req.body
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
        const saveValorTasas = await Valor_Tasas.create({
            plazo,
            tipo_activo,
            tasa_a,
            tasa_b,
            tasa_alfa,
            tasa_beta,
            tasa_gamma,
            who_created: admin.dataValues.email,
            when_created: new Date()
        })
        if (!saveValorTasas) {
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            })
        }
        return res.status(201).json({
            msg: 'Registro del valor de la tasa exitoso'
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const getTasasByTipoActivo = async (req: Request<{ tipo_activo: string }>, res: Response) => {
    const { tipo_activo } = req.params;
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
        const rows = await Valor_Tasas.findAll({
            where: {
                tipo_activo: {
                    [Op.like]: `%${tipo_activo}%`,
                },
            },
            attributes: ['id', 'plazo', 'tasa_a', 'tasa_b', 'tasa_alfa', 'tasa_beta', 'tasa_gamma'], // Solo obtener las columnas que deseas mostrar
        });
        return res.status(200).json({
            tipo_activo,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}


export const updateTasas = async (req: Request<{}, {}, IDTOValorTasasUpdate>, res: Response) => {
    const { id, tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma } = req.body;
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
        const updatedRow = await Valor_Tasas.update(
            {
                tasa_a, tasa_b, tasa_alfa, tasa_beta, tasa_gamma,
                who_modified: admin.dataValues.email,
                when_modified: new Date()
            },
            { where: { id } }
        );

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
