import { Request, Response } from "express"
import { Administrador } from "../models/administrador"
import { Editable } from "../models/editable"
import { IDTOEditable, IDTOEditableUpdate } from '../interfaces/editableInterface';

export const registerEditable = async (req: Request<{}, {}, IDTOEditable>, res: Response) => {
    const { campo, valor, tipo } = req.body
    try {
        const admin = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        if (!admin) {
            return res.status(404).json({
                msg: 'No se pudo crear el campo, ocurrió un error con la identificación del usuario'
            })
        }
        const saveValorTasas = await Editable.create({
            campo,
            valor,
            tipo,
            who_created: admin.dataValues.email,
            when_created: new Date()
        })
        if (!saveValorTasas) {
            return res.status(404).json({
                msg: 'No se pudo crear el campo'
            })
        }
        return res.status(201).json({
            msg: 'Registro del campo exitoso'
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const getEditable = async (req: Request, res: Response) => {
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
        const edit = await Editable.findAll({
            where: { deleted: false },
            attributes: ['campo', 'valor', 'tipo']
        })
        return res.status(200).json({
            edit
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

export const updateEditable = async (req: Request<{}, {}, IDTOEditableUpdate>, res: Response) => {
    const { id, campo, valor } = req.body;
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
        const updatedRow = await Editable.update(
            {
                campo,
                valor,
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

