import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Administrador from '../models/administrador'

export const verificadorSesion = async( req:Request, res: Response ) => {
    try {
        const user = await Administrador.findById(req.authData?.id).select( "name email -_id" )
        if(user) return res.json(user)
        console.log('Aqui vamos')
        res.json({msg:'En verificador de session'})
    } catch (error) {
        console.log('Error',error)
        res.json({error})
    }
}