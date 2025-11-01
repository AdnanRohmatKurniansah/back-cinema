"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.adminAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const admin_service_1 = require("../services/admin.service");
const adminAuthenticate = async (req, res, next) => {
    const authorizationHeader = req?.headers.authorization;
    if (!authorizationHeader) {
        return res.status(403).json({
            message: 'Access denied, no token provided'
        });
    }
    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_TOKEN);
        const admin = await (0, admin_service_1.GetAdmin)(decoded.id_admin);
        if (!admin) {
            return res.status(401).json({
                message: 'Invalid token, admin not found'
            });
        }
        const extendedReq = req;
        extendedReq.admin = {
            id_admin: admin.id_admin,
            username: admin.username,
            nama_admin: admin.nama_admin,
            email: admin.email,
            role: admin.role,
            id_cabang: admin.id_cabang,
            created_at: admin.created_at,
            updated_at: admin.updated_at
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
            error
        });
    }
};
exports.adminAuthenticate = adminAuthenticate;
const checkRole = (roles) => {
    return (req, res, next) => {
        const extendedReq = req;
        if (!extendedReq.admin) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const userRole = extendedReq.admin.role;
        if (roles.includes(userRole)) {
            return next();
        }
        return res.status(403).json({
            message: `Access denied. Required role: ${roles.join(' or ')}`
        });
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=admin.auth.js.map