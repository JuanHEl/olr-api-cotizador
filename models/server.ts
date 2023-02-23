import express, { Application } from 'express'
import userRouter from '../routes/usuario'
import clienteRouter from '../routes/cliente'
import cotizacionRouter from '../routes/cotizacion'
import valorResidualRouter from '../routes/valor_residual'
import adminRouter from '../routes/administrador'
import valorTasasRouter from '../routes/valor_tasas'
import valorOtrosGastosRouter from '../routes/valor_otros_gastos'
import yearsRouter from '../routes/years'
import marcaRouter from '../routes/marca'
import estadoActivoRouter from '../routes/estado_activo'
import tipoActivoRouter from '../routes/tipo_activo'
import cors from 'cors'

import db from '../db/connection'

class Server {

    private app: Application
    private port: string
    private apiPaths = {
        usuarios: '/api/usuarios',
        administradores: '/api/administrador',
        cliente: '/api/cliente',
        cotizacion: '/api/cotizacion',
        valores_residuales: '/api/valores_residuales',
        valores_tasas: '/api/valores_tasas',
        valores_otros_gastos: '/api/valores_otros_gastos',
        years: '/api/years',
        marca: '/api/marca',
        estado_activo: '/api/estado_activo',
        tipo_activo: '/api/tipo_activo'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'

        //metodos iniciales
        this.dbConnection()
        this.middlewares()
        this.routes()

        //Conectar base de datos
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('DB online')
        } catch (error) {
            throw new Error()
        }
    }

    middlewares() {
        //cors
        this.app.use(cors())

        //lectura body
        this.app.use(express.json())

        //carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRouter)
        this.app.use(this.apiPaths.cliente, clienteRouter)
        this.app.use(this.apiPaths.cotizacion, cotizacionRouter)
        this.app.use(this.apiPaths.valores_residuales, valorResidualRouter)
        this.app.use(this.apiPaths.administradores, adminRouter)
        this.app.use(this.apiPaths.valores_tasas, valorTasasRouter)
        this.app.use(this.apiPaths.valores_otros_gastos, valorOtrosGastosRouter)
        this.app.use(this.apiPaths.years, yearsRouter)
        this.app.use(this.apiPaths.marca, marcaRouter)
        this.app.use(this.apiPaths.estado_activo, estadoActivoRouter)
        this.app.use(this.apiPaths.tipo_activo, tipoActivoRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port)
        })
    }
}

export default Server