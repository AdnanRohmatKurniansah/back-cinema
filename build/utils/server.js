"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin_route_1 = require("../routes/admin.route");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cabang_route_1 = require("../routes/cabang.route");
const studio_route_1 = require("../routes/studio.route");
const kursi_route_1 = require("../routes/kursi.route");
const genre_route_1 = require("../routes/genre.route");
const createServer = () => {
    const swaggerFile = fs_1.default.readFileSync(path_1.default.join(process.cwd(), '../docs/swagger.json'), 'utf-8');
    const swaggerDocument = JSON.parse(swaggerFile);
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, {
        swaggerOptions: {
            persistAuthorization: true
        }
    }));
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    app.use('/api/admin', admin_route_1.AdminRoute);
    app.use('/api/cabang', cabang_route_1.CabangRoute);
    app.use('/api/studio', studio_route_1.StudioRoute);
    app.use('/api/kursi', kursi_route_1.KursiRoute);
    app.use('/api/genre', genre_route_1.GenreRoute);
    // app.get('/api/protected', authenticate, (req: Request, res: Response) => {
    //   res.send('Welcome to the protected route')
    // })
    return app;
};
exports.default = createServer;
//# sourceMappingURL=server.js.map