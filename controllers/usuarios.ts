import { Request, Response } from "express"
import Usuario from "../models/usuario"

export const getUsuarios = async( req: Request, res: Response ) => {
    const usuario = await Usuario.findAll()
    res.json({msg:'Usuarios',usuario})
}

// export const getUsuario = async( req: Request, res: Response ) => {
//     const { id } = req.params
//     const usuario = await Usuario.findByPk( id )
//     if (usuario){
//         res.json(usuario)
//     }else{
//         res.status(404).json({
//             msg:`No existe un usuario con el id ${ id }`
//         })
//     }
// }

// export const postUsuario = async( req: Request, res: Response ) => {
//     const { body } = req
//     try {
//         const existeEmail = await Usuario.findOne({
//             where:{
//                 email: body.email
//             }
//         })
//         if(existeEmail){
//             return res.status(400).json({
//                 msg: 'Ya existe un usuario con el email: ' + body.email 
//             })
//         }

//         const usuario = await Usuario.create(body)

//         // const usuario = Usuario.build(body)
//         // await usuario.save()
//         res.json(usuario)

//         // const usuario = new Usuario(body)
//         // await usuario.save()
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             msg: 'Consulte al administrador'
//         })
//     }
// }

// export const putUsuario = async( req: Request, res: Response ) => {
//     const { id } = req.params
//     const { body } = req
//     try {
//         const usuario = await Usuario.findByPk( id )
//         if (!usuario){
//             return res.status(404).json({
//                 msg: 'No existe el usuario con el id: '+ id
//             })
//         }
        
//         await usuario.update( body )
//         res.json(usuario)

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             msg: 'Consulte al administrador'
//         })
//     }
// }

// export const deleteUsuarios = async( req: Request, res: Response ) => {
//     const { id } = req.params

//     const usuario = await Usuario.findByPk( id )
//     if (!usuario){
//         return res.status(404).json({
//             msg: 'No existe el usuario con el id: '+ id
//         })
//     }
    
//     await usuario.update({estado:0})
//     //Borra definitivamente
//     // await usuario.destroy()

//     res.json(usuario)
// }