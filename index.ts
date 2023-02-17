// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });


import dotenv from 'dotenv'
import Server from './models/server'
import sequelize from "./db/connection";

declare module "express" {
    export interface Request {
        authData?:{
            id?:string,
            iat?:any
        }
    }
}

//Configurar dot
dotenv.config()
sequelize.sync({force:false, alter:true});

const server = new Server()

server.listen()