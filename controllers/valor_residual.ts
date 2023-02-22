import { Request, Response } from "express"
import Valor_Residual from "../models/valor_residual"
import { IDTOValorResidual } from '../interfaces/valorResidualInterfaces';
import Cliente from '../models/cliente';


export const getValoresResiduales = async (req: Request, res: Response) => {
    try {
        const valoresResiduales = await Valor_Residual.findAll()
        res.json({
            data: valoresResiduales
        })
        console.log('Existe valor residual: ',valoresResiduales.length)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Ocurrió un error en el servidor'
        })
    }
    res.status(200).json({ msg: 'En Cotización', data: { }})
}


export const registerValoresResiduales = async( req:Request<{},{},IDTOValorResidual>, res: Response ) => {
    const { plazo,maximo,minimo } = req.body
    try {
        const user = await Cliente.findOne({
            where:{
                id: req.authData?.id
            }
        }) 
        // return res.json({user})
        if(!user){
            return res.status(404).json({
                msg: 'No se pudo crear el valor, ocurrió un error con la identificación del usuario'
            })
        }
        const saveValorResidual = await Valor_Residual.create({
            plazo,
            minimo,
            maximo,
            who_created:user.id,
            deleted: false
        })
        if(!saveValorResidual){
            return res.status(404).json({
                msg: 'No se pudo crear el valor'
            })
        }
        return res.status(201).json({
            msg: 'Registro del valor residual exitoso'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error
        })
    }
}


