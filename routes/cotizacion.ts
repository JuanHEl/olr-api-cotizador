import { Router } from "express";
import { getCotizacion } from "../controllers/cotizacion";
import { validarJWT } from "../middlewares/validarJWT";

const cotizacionRouter = Router();

cotizacionRouter.use(validarJWT);
cotizacionRouter.get("/", getCotizacion);

export { cotizacionRouter };
