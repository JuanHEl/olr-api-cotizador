import { Router } from "express"
import { validarJWT } from "../middlewares/validarJWT";
import { getValoresOtrosGastos, registerValoresOtrosGastos, updateOtrosGastos, showValorOtrosGastos } from '../controllers/valor_otros_gastos';

const router = Router()
router.use(validarJWT)
router.get('/', getValoresOtrosGastos)
router.post('/', registerValoresOtrosGastos)
router.put('/', updateOtrosGastos)
router.get('/show_all_otros_gastos', showValorOtrosGastos)

export default router