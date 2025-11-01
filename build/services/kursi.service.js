"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteKursi = exports.UpdateKursi = exports.CreateKursi = exports.GetUniqueKursi = exports.GetKursi = exports.GetAllKursi = void 0;
const prisma_1 = require("../utilss/prisma");
const GetAllKursi = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.kursi.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                nomor_kursi: 'asc'
            }
        }),
        prisma_1.prisma.kursi.count()
    ]);
    return { data, total };
};
exports.GetAllKursi = GetAllKursi;
const GetKursi = async (id_kursi) => {
    return await prisma_1.prisma.kursi.findUnique({
        where: {
            id_kursi
        }
    });
};
exports.GetKursi = GetKursi;
const GetUniqueKursi = async (nomor_kursi) => {
    return await prisma_1.prisma.kursi.findUnique({
        where: {
            nomor_kursi
        }
    });
};
exports.GetUniqueKursi = GetUniqueKursi;
const CreateKursi = async (payload) => {
    return await prisma_1.prisma.kursi.create({
        data: payload
    });
};
exports.CreateKursi = CreateKursi;
const UpdateKursi = async (id_kursi, payload) => {
    return await prisma_1.prisma.kursi.update({
        where: {
            id_kursi
        },
        data: payload
    });
};
exports.UpdateKursi = UpdateKursi;
const DeleteKursi = async (id_kursi) => {
    return await prisma_1.prisma.kursi.delete({
        where: {
            id_kursi
        }
    });
};
exports.DeleteKursi = DeleteKursi;
//# sourceMappingURL=kursi.service.js.map