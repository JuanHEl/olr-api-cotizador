import { Router } from "express"
import { validarJWT } from "../middlewares/validarJWT";
import { getTipoActivo, registerTipoActivo, updateTipoActivo, showTipoActivo, deleteTipoActivo } from '../controllers/tipo_activo';

const router = Router()
router.use(validarJWT)
router.get('/', getTipoActivo)
router.post('/', registerTipoActivo)
router.put('/', updateTipoActivo)
router.get('/show_all_tipo_activo', showTipoActivo)
router.put('/delete_tipo_activo', deleteTipoActivo)

export default router