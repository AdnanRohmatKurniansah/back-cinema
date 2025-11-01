"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAdmin = exports.UpdateAdmin = exports.CreateAdmin = exports.GetUniqueAdmin = exports.GetAdmin = exports.GetAllAdmin = void 0;
const prisma_1 = require("../utils/prisma");
const GetAllAdmin = async (currentAdminId, page, limit) => {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.admin.findMany({
            where: {
                NOT: {
                    id_admin: currentAdminId
                }
            },
            skip: offset,
            take: limit,
            orderBy: {
                nama_admin: 'asc'
            }
        }),
        prisma_1.prisma.admin.count()
    ]);
    return { data, total };
};
exports.GetAllAdmin = GetAllAdmin;
const GetAdmin = async (id_admin) => {
    return await prisma_1.prisma.admin.findUnique({
        where: {
            id_admin
        }
    });
};
exports.GetAdmin = GetAdmin;
const GetUniqueAdmin = async (username) => {
    return await prisma_1.prisma.admin.findUnique({
        where: {
            username
        }
    });
};
exports.GetUniqueAdmin = GetUniqueAdmin;
const CreateAdmin = async (payload) => {
    return await prisma_1.prisma.admin.create({
        data: payload
    });
};
exports.CreateAdmin = CreateAdmin;
const UpdateAdmin = async (id_admin, payload) => {
    return await prisma_1.prisma.admin.update({
        where: {
            id_admin
        },
        data: payload
    });
};
exports.UpdateAdmin = UpdateAdmin;
const DeleteAdmin = async (id_admin) => {
    return await prisma_1.prisma.admin.delete({
        where: {
            id_admin
        }
    });
};
exports.DeleteAdmin = DeleteAdmin;
//# sourceMappingURL=admin.service.js.map