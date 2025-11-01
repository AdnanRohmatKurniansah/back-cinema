"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioRoute = void 0;
const express_1 = require("express");
const studio_controller_1 = require("../controllers/studio.controller");
const admin_auth_1 = require("../middlewares/admin.auth");
exports.StudioRoute = (0, express_1.Router)();
exports.StudioRoute.get('/', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), studio_controller_1.GetAll);
exports.StudioRoute.post('/create', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), studio_controller_1.Create);
exports.StudioRoute.put('/update/:id_studio', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), studio_controller_1.Update);
exports.StudioRoute.delete('/delete/:id_studio', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin']), studio_controller_1.Delete);
//# sourceMappingURL=studio.route.js.map