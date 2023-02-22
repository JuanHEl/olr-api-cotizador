import { Router } from "express"
import { getCotizacion } from "../controllers/cotizacion"
import { validarJWT } from '../middlewares/validarJWT';

const router = Router()

router.use(validarJWT)
router.get('/', getCotizacion)

export default router