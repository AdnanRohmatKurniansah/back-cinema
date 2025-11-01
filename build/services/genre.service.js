"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteGenre = exports.UpdateGenre = exports.CreateGenre = exports.GetUniqueGenre = exports.GetGenre = exports.GetAllGenre = void 0;
const prisma_1 = require("../utils/prisma");
const GetAllGenre = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
        prisma_1.prisma.genre.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                nama_genre: 'asc'
            }
        }),
        prisma_1.prisma.genre.count()
    ]);
    return { data, total };
};
exports.GetAllGenre = GetAllGenre;
const GetGenre = async (id_genre) => {
    return await prisma_1.prisma.genre.findUnique({
        where: {
            id_genre
        }
    });
};
exports.GetGenre = GetGenre;
const GetUniqueGenre = async (nama_genre) => {
    return await prisma_1.prisma.genre.findUnique({
        where: {
            nama_genre
        }
    });
};
exports.GetUniqueGenre = GetUniqueGenre;
const CreateGenre = async (payload) => {
    return await prisma_1.prisma.genre.create({
        data: payload
    });
};
exports.CreateGenre = CreateGenre;
const UpdateGenre = async (id_genre, payload) => {
    return await prisma_1.prisma.genre.update({
        where: {
            id_genre
        },
        data: payload
    });
};
exports.UpdateGenre = UpdateGenre;
const DeleteGenre = async (id_genre) => {
    return await prisma_1.prisma.genre.delete({
        where: {
            id_genre
        }
    });
};
exports.DeleteGenre = DeleteGenre;
//# sourceMappingURL=genre.service.js.map