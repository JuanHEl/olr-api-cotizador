"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOtherAdmin = exports.updateAdminPass = exports.updateAdmin = exports.loginAdmin = exports.registerAdministrador = exports.getAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const administrador_1 = __importDefault(require("../models/administrador"));
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield administrador_1.default.findAll();
    res.json({ msg: 'Admins', admin });
});
exports.getAdmin = getAdmin;
const registerAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, tipo_administrador } = req.body;
    try {
        const adminExist = yield administrador_1.default.findOne({
            where: {
                email
            }
        });
        if (adminExist) {
            return res.status(404).json({
                msg: 'Ya existe un usuario con el email: ' + email
            });
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        const saveAdmin = yield administrador_1.default.create({
            nombre,
            email,
            tipo_administrador,
            password: hash
        });
        if (!saveAdmin) {
            return res.status(404).json({
                msg: 'No se pudo crear el administrador: ' + nombre
            });
        }
        return res.status(201).json({
            msg: 'Administrador creado con éxito'
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.registerAdministrador = registerAdministrador;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield administrador_1.default.findOne({
            where: {
                email
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se encuentra registro del administrador'
            });
        }
        const passwordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, process.env.SECRET_JWT);
        res.status(201).json({
            nombre: admin.nombre,
            email: admin.email,
            telefono: admin.telefono,
            tipo_administrador: admin.tipo_administrador,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
});
exports.loginAdmin = loginAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nombre, tipo_administrador, email } = req.body;
    try {
        const adminExist = yield administrador_1.default.findOne({
            where: {
                id: (_a = req.authData) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        if (!adminExist) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            });
        }
        yield adminExist.update({
            nombre,
            tipo_administrador,
            email
        });
        return res.status(201).json({
            msg: 'El administrador fue actualizado con éxito'
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Error en admin',
            error: error
        });
    }
});
exports.updateAdmin = updateAdmin;
const updateAdminPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { password, newPassword } = req.body;
    try {
        // Encuentra al administrador
        const adminExist = yield administrador_1.default.findOne({
            where: {
                id: (_b = req.authData) === null || _b === void 0 ? void 0 : _b.id
            }
        });
        // Verifica que sea un usuario activo
        if (adminExist.deleted === true) {
            return res.status(400).json({ error: 'Este usuario ha sido eliminado' });
        }
        // Verifica que los tipos de datos sean correctos
        if (typeof password !== 'string' || typeof newPassword !== 'string') {
            return res.status(400).json({ error: 'Los tipos de datos son incorrectos' });
        }
        // Verifica que se haya encontrado el administrador
        if (!adminExist) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            });
        }
        // Verifica que la contraseña actual del usuario sea válida
        const validPassword = yield bcrypt_1.default.compare(password, adminExist.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
        }
        // Actualiza la contraseña del usuario
        const passCifrada = yield bcrypt_1.default.hash(newPassword, 10);
        yield adminExist.update({ password: passCifrada });
        // Retorna la respuesta de la contraseña si es efectuada con éxito
        return res.status(201).json({
            msg: 'Contraseña actualizada con éxito'
        });
    }
    catch (error) {
        // Retorna un error si es que ocurre en la operación
        return res.status(500).json({
            msg: 'Error al actualizar la contraseña',
            error: error
        });
    }
});
exports.updateAdminPass = updateAdminPass;
const deleteOtherAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id_eliminar } = req.body;
    try {
        // Encuentra al administrador
        const admin = yield administrador_1.default.findOne({
            where: {
                id: (_c = req.authData) === null || _c === void 0 ? void 0 : _c.id
            }
        });
        if (!admin) {
            return res.status(404).json({
                msg: 'No se encuentra el administrador'
            });
        }
        const eliminado = yield administrador_1.default.findOne({
            where: {
                id: id_eliminar
            }
        });
        if (!eliminado) {
            return res.status(404).json({
                msg: 'No se pudo eliminar el administrador'
            });
        }
        yield admin.update({
            deleted: true,
            who_deleted: admin.email,
            when_deleted: new Date()
        });
        return res.status(201).json({
            msg: 'El administrador eliminado con éxito'
        });
    }
    catch (error) {
        // Retorna un error si es que ocurre en la operación
        return res.status(500).json({
            msg: 'Error al eliminar administrador',
            error: error
        });
    }
});
exports.deleteOtherAdmin = deleteOtherAdmin;
