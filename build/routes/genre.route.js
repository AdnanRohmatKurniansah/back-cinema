"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreRoute = void 0;
const express_1 = require("express");
const genre_controller_1 = require("../controllers/genre.controller");
const admin_auth_1 = require("../middlewares/admin.auth");
exports.GenreRoute = (0, express_1.Router)();
exports.GenreRoute.get('/', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin', 'Staff']), genre_controller_1.GetAll);
exports.GenreRoute.post('/create', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin', 'Staff']), genre_controller_1.Create);
exports.GenreRoute.put('/update/:id_genre', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin', 'Staff']), genre_controller_1.Update);
exports.GenreRoute.delete('/delete/:id_genre', admin_auth_1.adminAuthenticate, (0, admin_auth_1.checkRole)(['SuperAdmin', 'Staff']), genre_controller_1.Delete);
//# sourceMappingURL=genre.route.js.map