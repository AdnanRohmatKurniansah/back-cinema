"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CabangSchema = void 0;
const zod_1 = require("zod");
exports.CabangSchema = zod_1.z.object({
    nama_cabang: zod_1.z.string().min(1, 'Nama Cabang is required').max(150, 'Max Character 150'),
    alamat: zod_1.z.string().min(1, 'Username is required').max(100, 'Max Character 100'),
    no_telp: zod_1.z.string().min(1, 'No Telp is required').max(20, 'Max Character 20')
});
//# sourceMappingURL=cabang.validation.js.map