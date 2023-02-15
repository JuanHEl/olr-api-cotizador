import { Router } from "express"
import { getCotizacion } from "../controllers/cotizacion"

const router = Router()

router.get('/', getCotizacion)

export default router