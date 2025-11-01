"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreSchema = void 0;
const zod_1 = require("zod");
exports.GenreSchema = zod_1.z.object({
    nama_genre: zod_1.z.string().min(1, 'Nama Genre is required').max(80, 'Max Character 80'),
});
//# sourceMappingURL=genre.validation.js.map