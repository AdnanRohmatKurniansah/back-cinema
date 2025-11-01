"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger and TypeScript'
        },
        servers: [
            {
                url: process.env.BASE_URL || 'http://localhost:3000',
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map