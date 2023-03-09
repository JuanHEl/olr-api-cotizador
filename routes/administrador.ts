import { Router } from "express";
import {
  getAdmin,
  loginAdmin,
  registerAdministrador,
  updateAdmin,
  updateAdminPass,
  deleteOtherAdmin,
  showAdmin,
  getAdminSession,
  replacePassword,
} from "../controllers/administrador";
import { validarJWT } from "../middlewares/validarJWT";

const administradorRouter = Router();

administradorRouter.post("/login", loginAdmin);
administradorRouter.use(validarJWT);
administradorRouter.post("/", registerAdministrador);
administradorRouter.get("/", getAdmin);
administradorRouter.put("/", updateAdmin);
administradorRouter.put("/password", updateAdminPass);
administradorRouter.put("/delete_admin", deleteOtherAdmin);
administradorRouter.get("/show_all_admins", showAdmin);
administradorRouter.get("/get_data_session", getAdminSession);
administradorRouter.put("/replace_password", replacePassword);

export { administradorRouter };
