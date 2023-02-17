import { Router } from "express"
import { registerValoresResiduales } from "../controllers/valor_residual";
import { validarJWT } from "../middlewares/validarJWT";
import { verificadorSesion } from "../middlewares/validarSession";

const router = Router()
router.use(validarJWT)
router.get('/session', verificadorSesion)
router.post('/registerVR', registerValoresResiduales)

export default router
