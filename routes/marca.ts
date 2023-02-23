import { Router } from "express"
import { validarJWT } from "../middlewares/validarJWT";
import { getMarca, registerMarca, updateMarca, showMarca, deleteMarca } from '../controllers/marca';

const router = Router()
router.use(validarJWT)
router.get('/', getMarca)
router.post('/', registerMarca)
router.put('/', updateMarca)
router.get('/show_all_marca', showMarca)
router.put('/delete_marca', deleteMarca)

export default router