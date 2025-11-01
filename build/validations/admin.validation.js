"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginSchema = exports.AdminSchema = void 0;
const zod_1 = require("zod");
exports.AdminSchema = zod_1.z.object({
    nama_admin: zod_1.z.string().min(1, 'Nama Admin is required').max(150, 'Max Character 150'),
    username: zod_1.z.string().min(1, 'Username is required').max(70, 'Max Character 70'),
    email: zod_1.z.email().min(1, 'Email is required').max(100, 'Max Character 100'),
    role: zod_1.z.string(),
    id_cabang: zod_1.z.number().nullable().optional(),
    password: zod_1.z.string().min(1, 'Password is required')
});
exports.AdminLoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required').max(70, 'Max Character 70'),
    password: zod_1.z.string().min(1, 'Password is required')
});
//# sourceMappingURL=admin.validation.js.map