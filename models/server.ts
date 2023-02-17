import express, { Application } from 'express'
import userRouter from '../routes/usuario'
import clienteRouter from '../routes/cliente'
import cotizacionRouter from '../routes/cotizacion'
import valorResidualRouter from '../routes/valor_residual'
import cors from 'cors'

import db from '../db/connection'

class Server {

    private app: Application
    private port: string 
    private apiPaths = {
        usuarios: '/api/usuarios',
        cliente: '/api/cliente',
        cotizacion: '/api/cotizacion',
        valores_residuales:'/api/valores_residuales'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT  || '8000'

        //metodos iniciales
        this.dbConnection()
        this.middlewares()
        this.routes()

        //Conectar base de datos
    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log('DB online')
        } catch (error) {
            throw new Error()
        }
    }

    middlewares(){
        //cors
        this.app.use( cors())

        //lectura body
        this.app.use( express.json() )

        //carpeta publica
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRouter )
        this.app.use( this.apiPaths.cliente, clienteRouter )
        this.app.use( this.apiPaths.cotizacion, cotizacionRouter)
        this.app.use( this.apiPaths.valores_residuales, valorResidualRouter )
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto ' + this.port )
        } )
    }
}

export default Server