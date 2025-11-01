"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteStudio = exports.UpdateStudio = exports.CreateStudio = exports.GetStudio = exports.GetAllStudio = void 0;
const prisma_1 = require("../utils/prisma");
const GetAllStudio = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.studio.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                nama_studio: 'asc'
            }
        }),
        prisma_1.prisma.studio.count()
    ]);
    return { data, total };
};
exports.GetAllStudio = GetAllStudio;
const GetStudio = async (id_studio) => {
    return await prisma_1.prisma.studio.findUnique({
        where: {
            id_studio
        }
    });
};
exports.GetStudio = GetStudio;
const CreateStudio = async (payload) => {
    return await prisma_1.prisma.studio.create({
        data: payload
    });
};
exports.CreateStudio = CreateStudio;
const UpdateStudio = async (id_studio, payload) => {
    return await prisma_1.prisma.studio.update({
        where: {
            id_studio
        },
        data: payload
    });
};
exports.UpdateStudio = UpdateStudio;
const DeleteStudio = async (id_studio) => {
    return await prisma_1.prisma.studio.delete({
        where: {
            id_studio
        }
    });
};
exports.DeleteStudio = DeleteStudio;
//# sourceMappingURL=studio.service.js.map