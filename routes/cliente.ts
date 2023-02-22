import { Router } from "express"
import { getCliente, registerCliente, loginCliente } from "../controllers/cliente";
import { validarJWT } from '../middlewares/validarJWT';

const router = Router()

router.post('/login', loginCliente)
router.use(validarJWT)
router.get('/', getCliente)
router.post('/', registerCliente)

export default router