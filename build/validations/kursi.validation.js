"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KursiSchema = void 0;
const zod_1 = require("zod");
exports.KursiSchema = zod_1.z.object({
    nomor_kursi: zod_1.z.string().min(1, 'Nomor Kursi is required').max(20, 'Max Character 20'),
    status_kursi: zod_1.z.string().optional(),
    id_studio: zod_1.z.number().min(1, 'Id Studio is required')
});
//# sourceMappingURL=kursi.validation.js.map