"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.GetAll = void 0;
const genre_service_1 = require("../services/genre.service");
const genre_validation_1 = require("../validations/genre.validation");
const GetAll = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const { data, total } = await (0, genre_service_1.GetAllGenre)(page, limit);
        return res.json({
            message: "Genre's Data",
            data,
            total,
            page,
            limit
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
};
exports.GetAll = GetAll;
const Create = async (req, res) => {
    try {
        const requestData = await req.body;
        const validationData = genre_validation_1.GenreSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const existGenre = await (0, genre_service_1.GetUniqueGenre)(requestData.nama_genre);
        if (existGenre) {
            return res.status(409).json({
                message: 'Genre already exist'
            });
        }
        const cabang = await (0, genre_service_1.CreateGenre)(requestData);
        return res.status(200).json({
            message: 'Genre Data created successfully',
            data: cabang
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
};
exports.Create = Create;
const Update = async (req, res) => {
    const id_genre = Number(req.params.id_genre);
    try {
        const existGenre = await (0, genre_service_1.GetGenre)(id_genre);
        if (!existGenre) {
            return res.status(404).json({
                message: 'Genre data not found'
            });
        }
        const requestData = await req.body;
        const validationData = genre_validation_1.GenreSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        if (requestData.nama_genre !== existGenre.nama_genre) {
            const namaGenre = await (0, genre_service_1.GetUniqueGenre)(requestData.nama_genre);
            if (namaGenre) {
                return res.status(409).json({
                    message: 'Genre already exist'
                });
            }
        }
        const updatedGenre = await (0, genre_service_1.UpdateGenre)(id_genre, requestData);
        return res.status(200).json({
            message: 'Genre data updated successfully',
            data: updatedGenre
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error
        });
    }
};
exports.Update = Update;
const Delete = async (req, res) => {
    const id_cabang = Number(req.params.id_cabang);
    try {
        const cabang = await (0, genre_service_1.GetGenre)(id_cabang);
        if (!cabang) {
            return res.status(404).json({
                message: 'Genre data not found'
            });
        }
        const response = await (0, genre_service_1.DeleteGenre)(id_cabang);
        return res.status(200).json({
            message: 'Genre data deleted successfully',
            data: response
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
};
exports.Delete = Delete;
//# sourceMappingURL=genre.controller.js.map