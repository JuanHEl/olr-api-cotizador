import { Router } from "express"
import { validarJWT } from "../middlewares/validarJWT";
import { getEstadoActivo, registerEstadoActivo, updateEstadoActivo, showEstadoActivo, deleteEstadoActivo } from '../controllers/estado_activo';

const router = Router()
router.use(validarJWT)
router.get('/', getEstadoActivo)
router.post('/', registerEstadoActivo)
router.put('/', updateEstadoActivo)
router.get('/show_all_estado_activo', showEstadoActivo)
router.put('/delete_estado_activo', deleteEstadoActivo)

export default router