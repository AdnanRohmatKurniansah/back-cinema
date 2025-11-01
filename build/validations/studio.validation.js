"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioSchema = void 0;
const zod_1 = require("zod");
exports.StudioSchema = zod_1.z.object({
    nama_studio: zod_1.z.string().min(1, 'Nama Studio is required').max(150, 'Max Character 150'),
    kapasitas: zod_1.z.number().min(1, 'Kapasitas is required'),
    id_cabang: zod_1.z.number().min(1, 'Id Cabang is required')
});
//# sourceMappingURL=studio.validation.js.map