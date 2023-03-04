import { Router } from "express"
import { getAdmin, loginAdmin, registerAdministrador, updateAdmin, updateAdminPass, deleteOtherAdmin, showAdmin, getAdminSession, replacePassword } from '../controllers/administrador';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router()

router.post('/login', loginAdmin)
router.use(validarJWT)
router.post('/', registerAdministrador)
router.get('/', getAdmin)
router.put('/', updateAdmin)
router.put('/password', updateAdminPass)
router.put('/delete_admin', deleteOtherAdmin)
router.get('/show_all_admins', showAdmin)
router.get('/get_data_session', getAdminSession)
router.put('/replace_password', replacePassword)

export default router