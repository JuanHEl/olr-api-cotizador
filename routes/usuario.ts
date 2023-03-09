import { Router } from "express";
import { getUsuarios } from "../controllers/usuario";

const usuarioRouter = Router();

usuarioRouter.get("/", getUsuarios);
// usuarioRouter.get('/:id',    getUsuario)
// usuarioRouter.post('/',      postUsuario)
// usuarioRouter.put('/:id',    putUsuario)
// usuarioRouter.delete('/:id', deleteUsuarios)

export { usuarioRouter };
