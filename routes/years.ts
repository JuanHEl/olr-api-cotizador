import { Router } from "express"
import { validarJWT } from "../middlewares/validarJWT";
import { getYears, registerYears, updateYears, showYears, deleteYears } from '../controllers/years';

const router = Router()
router.use(validarJWT)
router.get('/', getYears)
router.post('/', registerYears)
router.put('/', updateYears)
router.get('/show_all_years', showYears)
router.put('/delete_year', deleteYears)

export default router