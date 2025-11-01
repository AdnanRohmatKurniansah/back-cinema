"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KursiRoute = void 0;
const express_1 = require("express");
const kursi_controller_1 = require("../controllers/kursi.controller");
const admin_auth_1 = require("../middlewares/admin.auth");
exports.KursiRoute = (0, express_1.Router)();
exports.KursiRoute.get('/', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), kursi_controller_1.GetAll);
exports.KursiRoute.post('/create', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), kursi_controller_1.Create);
exports.KursiRoute.put('/update/:id_kursi', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), kursi_controller_1.Update);
exports.KursiRoute.delete('/delete/:id_kursi', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), kursi_controller_1.Delete);
//# sourceMappingURL=kursi.route.js.map