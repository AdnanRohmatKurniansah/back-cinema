"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_TOKEN = exports.JWT_ACCESS_TOKEN = exports.PORT = exports.DATABASE_URL = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NODE_ENV = process.env.NODE_ENV;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT;
exports.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
exports.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
//# sourceMappingURL=index.js.map