"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Update = exports.Create = exports.GetAll = exports.Login = void 0;
const admin_validation_1 = require("../validations/admin.validation");
const bcrypt_1 = require("bcrypt");
const generateToken_1 = require("../utilss/generateToken");
const admin_service_1 = require("../services/admin.service");
const Login = async (req, res) => {
    try {
        const requestData = await req.body;
        const validationData = admin_validation_1.AdminLoginSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const adminExist = await (0, admin_service_1.GetUniqueAdmin)(requestData.username);
        if (!adminExist) {
            return res.status(404).json({
                message: 'Admin doesnt exist'
            });
        }
        const auth = await (0, bcrypt_1.compare)(requestData.password, adminExist.password);
        if (auth) {
            const token = (0, generateToken_1.AdminAccessToken)(adminExist);
            return res.status(200).json({
                message: 'Login successfully',
                token: `Bearer ${token}`
            });
        }
        else {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
};
exports.Login = Login;
const GetAll = async (req, res) => {
    try {
        const extendedReq = req;
        const currentAdminId = extendedReq.admin.id_admin;
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 10);
        const { data, total } = await (0, admin_service_1.GetAllAdmin)(currentAdminId, page, limit);
        return res.json({
            message: "Admin's Data",
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
        const validationData = admin_validation_1.AdminSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        const adminExist = await (0, admin_service_1.GetUniqueAdmin)(requestData.username);
        if (adminExist) {
            return res.status(409).json({
                message: 'Username already exist'
            });
        }
        const hashedPassword = await (0, bcrypt_1.hash)(requestData.password, 10);
        requestData.password = hashedPassword;
        const admin = await (0, admin_service_1.CreateAdmin)(requestData);
        return res.status(200).json({
            message: 'Admin Data created successfully',
            data: admin
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
    const id_admin = Number(req.params.id_admin);
    try {
        const existAdmin = await (0, admin_service_1.GetAdmin)(id_admin);
        if (!existAdmin) {
            return res.status(404).json({
                message: 'Admin data not found'
            });
        }
        const requestData = await req.body;
        const validationData = admin_validation_1.AdminSchema.safeParse(requestData);
        if (!validationData.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationData.error
            });
        }
        if (requestData.username !== existAdmin.username) {
            const adminExist = await (0, admin_service_1.GetUniqueAdmin)(requestData.username);
            if (adminExist) {
                return res.status(409).json({
                    message: 'Username already exist'
                });
            }
        }
        if (requestData.password) {
            const hashedPassword = await (0, bcrypt_1.hash)(requestData.password, 10);
            requestData.password = hashedPassword;
        }
        const payload = {
            username: requestData.username ?? existAdmin.username,
            nama_admin: requestData.nama_admin ?? existAdmin.nama_admin,
            email: requestData.email ?? existAdmin.email,
            password: requestData.password ?? existAdmin.password,
            role: requestData.role ?? existAdmin.role,
            id_cabang: requestData.id_cabang ?? existAdmin.id_cabang,
            updated_at: new Date()
        };
        const updatedAdmin = await (0, admin_service_1.UpdateAdmin)(id_admin, payload);
        return res.status(200).json({
            message: 'Admin data updated successfully',
            data: updatedAdmin
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
    const id_admin = Number(req.params.id_admin);
    try {
        const admin = await (0, admin_service_1.GetAdmin)(id_admin);
        if (!admin) {
            return res.status(404).json({
                message: 'Admin data not found'
            });
        }
        const response = await (0, admin_service_1.DeleteAdmin)(id_admin);
        return res.status(200).json({
            message: 'Admin data deleted successfully',
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
//# sourceMappingURL=admin.controller.js.map