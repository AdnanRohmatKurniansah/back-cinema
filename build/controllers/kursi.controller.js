"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.GetAll = void 0;
const kursi_service_1 = require("../services/kursi.service");
const kursi_validation_1 = require("../validations/kursi.validation");
const studio_service_1 = require("../services/studio.service");
const GetAll = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const { data, total } = await (0, kursi_service_1.GetAllKursi)(page, limit);
        return res.json({
            message: "Kursi's Data",
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
        const validationData = kursi_validation_1.KursiSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const existKursi = await (0, kursi_service_1.GetUniqueKursi)(requestData.nomor_kursi);
        if (existKursi) {
            return res.status(409).json({
                message: 'Kursi already exist'
            });
        }
        const existStudio = await (0, studio_service_1.GetStudio)(requestData.id_studio);
        if (!existStudio) {
            return res.status(404).json({
                message: 'Selected Studio not found'
            });
        }
        const cabang = await (0, kursi_service_1.CreateKursi)(requestData);
        return res.status(200).json({
            message: 'Kursi Data created successfully',
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
    const id_kursi = Number(req.params.id_kursi);
    try {
        const existKursi = await (0, kursi_service_1.GetKursi)(id_kursi);
        if (!existKursi) {
            return res.status(404).json({
                message: 'Kursi data not found'
            });
        }
        const requestData = await req.body;
        const validationData = kursi_validation_1.KursiSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        if (requestData.nomor_kursi !== existKursi.nomor_kursi) {
            const nomorKursi = await (0, kursi_service_1.GetUniqueKursi)(requestData.nomor_kursi);
            if (nomorKursi) {
                return res.status(409).json({
                    message: 'Kursi already exist'
                });
            }
        }
        const existStudio = await (0, studio_service_1.GetStudio)(requestData.id_studio);
        if (!existStudio) {
            return res.status(404).json({
                message: 'Selected Studio not found'
            });
        }
        const updatedKursi = await (0, kursi_service_1.UpdateKursi)(id_kursi, requestData);
        return res.status(200).json({
            message: 'Kursi data updated successfully',
            data: updatedKursi
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
    const id_kursi = Number(req.params.id_kursi);
    try {
        const cabang = await (0, kursi_service_1.GetKursi)(id_kursi);
        if (!cabang) {
            return res.status(404).json({
                message: 'Kursi data not found'
            });
        }
        const response = await (0, kursi_service_1.DeleteKursi)(id_kursi);
        return res.status(200).json({
            message: 'Kursi data deleted successfully',
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
//# sourceMappingURL=kursi.controller.js.map