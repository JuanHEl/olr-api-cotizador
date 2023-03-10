import { Router } from "express";
import { validarJWT } from "../middlewares/validarJWT";
import {
    getEditable,
    registerEditable,
    updateEditable
} from "../controllers/editable";

const editableRouter = Router();
editableRouter.use(validarJWT);
editableRouter.get("/", getEditable);
editableRouter.post("/", registerEditable);
editableRouter.put("/", updateEditable);

export { editableRouter };
