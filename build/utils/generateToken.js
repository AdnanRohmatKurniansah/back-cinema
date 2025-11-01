"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const AdminAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_ACCESS_TOKEN, {
        expiresIn: '30d'
    });
};
exports.AdminAccessToken = AdminAccessToken;
//# sourceMappingURL=generateToken.js.map