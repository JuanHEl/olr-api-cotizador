import { Router } from "express";
import {
  registerValoresResiduales,
  updateValoresResiduales,
  showValorValoresResiduales,
} from "../controllers/valor_residual";
import { validarJWT } from "../middlewares/validarJWT";
import { verificadorSesion } from "../middlewares/validarSession";

const valorResidualRouter = Router();
valorResidualRouter.use(validarJWT);
valorResidualRouter.get("/session", verificadorSesion);
valorResidualRouter.put("/", updateValoresResiduales);
valorResidualRouter.post("/", registerValoresResiduales);
valorResidualRouter.get("/show_all_valor_residual", showValorValoresResiduales);

export { valorResidualRouter };
