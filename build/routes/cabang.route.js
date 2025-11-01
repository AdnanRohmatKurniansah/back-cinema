"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabangRoute = void 0;
const express_1 = require("express");
const cabang_controller_1 = require("../controllers/cabang.controller");
const admin_auth_1 = require("../middlewares/admin.auth");
exports.CabangRoute = (0, express_1.Router)();
exports.CabangRoute.get('/', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), cabang_controller_1.GetAll);
exports.CabangRoute.post('/create', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), cabang_controller_1.Create);
exports.CabangRoute.put('/update/:id_cabang', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), cabang_controller_1.Update);
exports.CabangRoute.delete('/delete/:id_cabang', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), cabang_controller_1.Delete);
//# sourceMappingURL=cabang.route.js.map