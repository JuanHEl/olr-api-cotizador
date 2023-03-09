import { Router } from "express";
import {
  getTasasByTipoActivoPaginate,
  registerValoresTasa,
  getTasasByTipoActivo,
  updateTasas,
} from "../controllers/valor_tasas";
import { validarJWT } from "../middlewares/validarJWT";

const valorTasasRouter = Router();
valorTasasRouter.use(validarJWT);
valorTasasRouter.post("/", registerValoresTasa);
valorTasasRouter.put("/", updateTasas);
valorTasasRouter.get("/:tipo_activo", getTasasByTipoActivo);
// valorTasasRouter.get('/:tipo_activoPages', getTasasByTipoActivoPaginate)

export { valorTasasRouter };
