import { Router } from "express"
import { registerValoresResiduales, updateValoresResiduales, showValorValoresResiduales } from '../controllers/valor_residual';
import { validarJWT } from "../middlewares/validarJWT";
import { verificadorSesion } from "../middlewares/validarSession";

const router = Router()
router.use(validarJWT)
router.get('/session', verificadorSesion)
router.put('/', updateValoresResiduales)
router.post('/', registerValoresResiduales)
router.get('/show_all_valor_residual', showValorValoresResiduales)

export default router
