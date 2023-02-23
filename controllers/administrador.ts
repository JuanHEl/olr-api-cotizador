import { Request, Response } from "express"
import { IDTOAdministrador, IDTOUpdatePassword } from '../interfaces/administradorInterfaces';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Administrador from '../models/administrador';


export const getAdmin = async (req: Request, res: Response) => {
    const admin = await Administrador.findAll()
    res.json({ msg: 'Admins', admin })
}

export const registerAdministrador = async (req: Request<{}, {}, IDTOAdministrador>, res: Response) => {
    const { nombre, email, password, tipo_administrador } = req.body
    try {
        const adminExist = await Administrador.findOne({
            where: {
                email
            }
        })
        if (adminExist) {
            return res.status(404).json({
                msg: 'Ya existe un usuario con el email: ' + email
            })
        }
        const hash = await bcrypt.hash(password, 10)
        const saveAdmin = await Administrador.create({
            nombre,
            email,
            tipo_administrador,
            password: hash
        })
        if (!saveAdmin) {
            return res.status(404).json({
                msg: 'No se pudo crear el administrador: ' + nombre
            })
        }
        return res.status(201).json({
            msg: 'Administrador creado con éxito'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const loginAdmin = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
    const { email, password } = req.body
    try {
        const admin = await Administrador.findOne({
            where: {
                email
            }
        })
        if (!admin) {
            return res.status(404).json({
                msg: 'No se encuentra registro del administrador'
            })
        }
        const passwordValid = await bcrypt.compare(password, admin.password)
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }
        const token = jwt.sign({ id: admin.id }, process.env.SECRET_JWT as string)
        res.status(201).json({
            nombre: admin.nombre,
            email: admin.email,
            telefono: admin.telefono,
            tipo_administrador: admin.tipo_administrador,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        })
    }
}

export const updateAdmin = async (req: Request<{}, {}, IDTOAdministrador>, res: Response) => {
    const { nombre, tipo_administrador, email } = req.body
    try {
        const adminExist = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        if (!adminExist) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            })
        }
        await adminExist.update({
            nombre,
            tipo_administrador,
            email
        })
        return res.status(201).json({
            msg: 'El administrador fue actualizado con éxito'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en admin',
            error: error
        })
    }
}

export const updateAdminPass = async (req: Request<{}, {}, IDTOUpdatePassword>, res: Response) => {
    const { password, newPassword } = req.body as IDTOUpdatePassword
    try {
        // Encuentra al administrador
        const adminExist = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        // Verifica que sea un usuario activo
        if (adminExist.deleted === true) {
            return res.status(400).json({ error: 'Este usuario ha sido eliminado' })
        }
        // Verifica que los tipos de datos sean correctos
        if (typeof password !== 'string' || typeof newPassword !== 'string') {
            return res.status(400).json({ error: 'Los tipos de datos son incorrectos' })
        }
        // Verifica que se haya encontrado el administrador
        if (!adminExist) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            })
        }
        // Verifica que la contraseña actual del usuario sea válida
        const validPassword = await bcrypt.compare(password, adminExist.password)
        if (!validPassword) {
            return res.status(401).json({ error: 'La contraseña actual es incorrecta' })
        }

        // Actualiza la contraseña del usuario
        const passCifrada = await bcrypt.hash(newPassword, 10)
        await adminExist.update({ password: passCifrada })

        // Retorna la respuesta de la contraseña si es efectuada con éxito
        return res.status(201).json({
            msg: 'Contraseña actualizada con éxito'
        })
    } catch (error) {
        // Retorna un error si es que ocurre en la operación
        return res.status(500).json({
            msg: 'Error al actualizar la contraseña',
            error: error
        })
    }
}

export const deleteOtherAdmin = async (req: Request<{}, {}, { id_eliminar: number }>, res: Response) => {
    const { id_eliminar } = req.body
    try {
        // Encuentra al administrador
        const admin = await Administrador.findOne({
            where: {
                id: req.authData?.id
            }
        })
        if (!admin) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            })
        }
        const eliminado = await Administrador.findOne({
            where: {
                id: id_eliminar
            }
        })
        if (!eliminado) {
            return res.status(404).json({
                msg: 'No se pudo eliminar el administrador'
            })
        }
        await admin.update({
            deleted: true,
            who_deleted: admin.email,
            when_deleted: new Date()
        })
        return res.status(201).json({
            msg: 'El administrador eliminado con éxito'
        })
    } catch (error) {
        // Retorna un error si es que ocurre en la operación
        return res.status(500).json({
            msg: 'Error al eliminar administrador',
            error: error
        })
    }
}

export const showAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await Administrador.findOne({
            where: { deleted: false },
            attributes: ['id', 'nombre', 'email', 'tipo_administrador']
        })
        return res.json({
            data: admin
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        })
    }
}
