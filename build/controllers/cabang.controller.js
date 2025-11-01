"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.GetAll = void 0;
const cabang_service_1 = require("../services/cabang.service");
const cabang_validation_1 = require("../validations/cabang.validation");
const GetAll = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const { data, total } = await (0, cabang_service_1.GetAllCabang)(page, limit);
        return res.json({
            message: "Cabang's Data",
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
        const validationData = cabang_validation_1.CabangSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const cabang = await (0, cabang_service_1.CreateCabang)(requestData);
        return res.status(200).json({
            message: 'Cabang Data created successfully',
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
    const id_cabang = Number(req.params.id_cabang);
    try {
        const existCabang = await (0, cabang_service_1.GetCabang)(id_cabang);
        if (!existCabang) {
            return res.status(404).json({
                message: 'Cabang data not found'
            });
        }
        const requestData = await req.body;
        const validationData = cabang_validation_1.CabangSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const updatedCabang = await (0, cabang_service_1.UpdateCabang)(id_cabang, requestData);
        return res.status(200).json({
            message: 'Cabang data updated successfully',
            data: updatedCabang
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
        const cabang = await (0, cabang_service_1.GetCabang)(id_cabang);
        if (!cabang) {
            return res.status(404).json({
                message: 'Cabang data not found'
            });
        }
        const response = await (0, cabang_service_1.DeleteCabang)(id_cabang);
        return res.status(200).json({
            message: 'Cabang data deleted successfully',
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
//# sourceMappingURL=cabang.controller.js.map