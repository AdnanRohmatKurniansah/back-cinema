"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCabang = exports.UpdateCabang = exports.CreateCabang = exports.GetCabang = exports.GetAllCabang = void 0;
const prisma_1 = require("../utilss/prisma");
const GetAllCabang = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.cabang.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                nama_cabang: 'asc'
            }
        }),
        prisma_1.prisma.cabang.count()
    ]);
    return { data, total };
};
exports.GetAllCabang = GetAllCabang;
const GetCabang = async (id_cabang) => {
    return await prisma_1.prisma.cabang.findUnique({
        where: {
            id_cabang
        }
    });
};
exports.GetCabang = GetCabang;
const CreateCabang = async (payload) => {
    return await prisma_1.prisma.cabang.create({
        data: payload
    });
};
exports.CreateCabang = CreateCabang;
const UpdateCabang = async (id_cabang, payload) => {
    return await prisma_1.prisma.cabang.update({
        where: {
            id_cabang
        },
        data: payload
    });
};
exports.UpdateCabang = UpdateCabang;
const DeleteCabang = async (id_cabang) => {
    return await prisma_1.prisma.cabang.delete({
        where: {
            id_cabang
        }
    });
};
exports.DeleteCabang = DeleteCabang;
//# sourceMappingURL=cabang.service.js.map