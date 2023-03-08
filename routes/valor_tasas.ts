import { Router } from "express"
import { getTasasByTipoActivoPaginate, registerValoresTasa, getTasasByTipoActivo, updateTasas } from '../controllers/valor_tasas';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router()
router.use(validarJWT)
router.post('/', registerValoresTasa)
router.put('/', updateTasas)
router.get('/:tipo_activo', getTasasByTipoActivo)
// router.get('/:tipo_activoPages', getTasasByTipoActivoPaginate)

export default router