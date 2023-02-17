import { Router } from "express"
import { getCliente, registerCliente, loginCliente } from "../controllers/cliente";

const router = Router()

router.get('/', getCliente)
router.post('/', registerCliente)
router.post('/login', loginCliente)

export default router