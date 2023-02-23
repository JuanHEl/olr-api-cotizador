import { Router } from "express"
import { getAdmin, loginAdmin, registerAdministrador, updateAdmin, updateAdminPass, deleteOtherAdmin, showAdmin } from '../controllers/administrador';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router()

router.post('/login', loginAdmin)
router.post('/', registerAdministrador)
router.use(validarJWT)
router.get('/', getAdmin)
router.put('/', updateAdmin)
router.put('/password', updateAdminPass)
router.put('/delete_admin', deleteOtherAdmin)
router.get('/show_all_admins', showAdmin)

export default router