"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const server_1 = __importDefault(require("./utilss/server"));
const app = (0, server_1.default)();
app.listen(config_1.PORT, () => {
    console.log(`Server is running in port ${config_1.PORT}`);
    console.log(`Swagger docs running in port ${config_1.PORT} /api/docs`);
});
//# sourceMappingURL=index.js.map