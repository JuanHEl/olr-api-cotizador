import { Router } from "express"
import { getUsuarios } from '../controllers/usuarios';

const router = Router()

router.get('/',       getUsuarios)
// router.get('/:id',    getUsuario)
// router.post('/',      postUsuario)
// router.put('/:id',    putUsuario)
// router.delete('/:id', deleteUsuarios)

export default router