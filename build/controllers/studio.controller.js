"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.GetAll = void 0;
const studio_service_1 = require("../services/studio.service");
const studio_validation_1 = require("../validations/studio.validation");
const cabang_service_1 = require("../services/cabang.service");
const GetAll = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const { data, total } = await (0, studio_service_1.GetAllStudio)(page, limit);
        return res.json({
            message: "Studio's Data",
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
        const validationData = studio_validation_1.StudioSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const existCabang = await (0, cabang_service_1.GetCabang)(requestData.id_cabang);
        if (!existCabang) {
            return res.status(404).json({
                message: 'Selected Cabang not found'
            });
        }
        const cabang = await (0, studio_service_1.CreateStudio)(requestData);
        return res.status(200).json({
            message: 'Studio Data created successfully',
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
    const id_studio = Number(req.params.id_studio);
    try {
        const existStudio = await (0, studio_service_1.GetStudio)(id_studio);
        if (!existStudio) {
            return res.status(404).json({
                message: 'Studio data not found'
            });
        }
        const requestData = await req.body;
        const validationData = studio_validation_1.StudioSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const existCabang = await (0, cabang_service_1.GetCabang)(requestData.id_cabang);
        if (!existCabang) {
            return res.status(404).json({
                message: 'Selected Cabang not found'
            });
        }
        const updatedStudio = await (0, studio_service_1.UpdateStudio)(id_studio, requestData);
        return res.status(200).json({
            message: 'Studio data updated successfully',
            data: updatedStudio
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
    const id_studio = Number(req.params.id_studio);
    try {
        const cabang = await (0, studio_service_1.GetStudio)(id_studio);
        if (!cabang) {
            return res.status(404).json({
                message: 'Studio data not found'
            });
        }
        const response = await (0, studio_service_1.DeleteStudio)(id_studio);
        return res.status(200).json({
            message: 'Studio data deleted successfully',
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
//# sourceMappingURL=studio.controller.js.map