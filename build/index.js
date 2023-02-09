"use strict";
// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app: Express = express();
// const port = process.env.PORT;
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
const connection_1 = __importDefault(require("./db/connection"));
//Configurar dot
dotenv_1.default.config();
connection_1.default.sync({ force: false, alter: true });
const server = new server_1.default();
server.listen();
