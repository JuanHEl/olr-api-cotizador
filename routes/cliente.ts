import { Router } from "express";
import {
  getCliente,
  registerCliente,
  loginCliente,
} from "../controllers/cliente";
import { validarJWT } from "../middlewares/validarJWT";

const clienteRouter = Router();

clienteRouter.post("/login", loginCliente);
clienteRouter.use(validarJWT);
clienteRouter.get("/", getCliente);
clienteRouter.post("/", registerCliente);

export { clienteRouter };
