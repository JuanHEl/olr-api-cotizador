import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const validarJWT = ( req:Request<{},{},{ id:string }>, res:Response, next:NextFunction ) => {
    // Pendiente
    const token = req.header('token')
    if( !token ){
        return res.status(401).json({
            msg:'El token es necesario para la petición'
        })
    }
    try {
        const extraccion = jwt.verify( token, process.env.SECRET_JWT as string )
        next() 
    } catch (error) {
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}
