"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const admin_auth_1 = require("../middlewares/admin.auth");
exports.AdminRoute = (0, express_1.Router)();
exports.AdminRoute.get('/', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), admin_controller_1.GetAll);
exports.AdminRoute.post('/create', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), admin_controller_1.Create);
exports.AdminRoute.put('/update/:id_admin', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), admin_controller_1.Update);
exports.AdminRoute.delete('/delete/:id_admin', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), admin_controller_1.Delete);
exports.AdminRoute.post('/login', admin_controller_1.Login);
//# sourceMappingURL=admin.route.js.map