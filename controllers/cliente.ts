import { Request, Response } from "express"
import { IDTOCliente } from "../interfaces/clienteInterfaces"
import Cliente from "../models/cliente"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getCliente = async( req: Request, res: Response ) => {
    const cliente = await Cliente.findAll()
    res.json({msg:'Cliente',cliente})
}

export const registerCliente = async( req:Request<{},{},IDTOCliente>, res: Response ) => {
    const { nombre,email,password,telefono } = req.body
    try {
        const clienteExist = await Cliente.findOne({
            where:{
                email
            }
        }) 
        if( clienteExist ){
            return res.status(404).json({
                msg: 'Ya existe un usuario con el email: ' + email 
            })
        }
        const hash = await bcrypt.hash(password,10)
        const saveCliente = await Cliente.create({
            nombre,
            email,
            telefono,
            password: hash
        })
        if(!saveCliente){
            return res.status(404).json({
                msg: 'No se pudo crear el cliente: ' +nombre
            })
        }
            return res.status(201).json({
                msg: 'Cliente creado con éxito'
            })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const loginCliente = async( req:Request<{},{},{email:string, password:string}>, res: Response ) => {
    const { email, password } = req.body
    try {
        const cliente = await Cliente.findOne({
            where:{
                email
            }
        })
        if(!cliente){
            res.status(404).json({
                msg:'No se encuentra registro del cliente'
            })
        }
        const passwordValid = bcrypt.compare( password, cliente.password )
        if(!passwordValid){
            res.status(400).json({
                msg:'La contraseña es incorrecta'
            })
        }
        const token = jwt.sign( {id:cliente.id} , process.env.SECRET_JWT as string)
        res.status(201).json({
            nombre:cliente.nombre,
            email:cliente.email,
            telefono:cliente.telefono,
            tipo_cliente:cliente.tipo_cliente,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

export const logout = async( req: Request<{},{},{ id:string }>, res: Response ) => {
    const { id } = req.body
    try {
        // pendiente
        res.status(201).json({
            msg:'Se ha cerrado la sesión con éxito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}