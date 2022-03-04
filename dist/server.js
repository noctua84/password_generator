"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const password_route_1 = require("./routes/password.route");
// init application:
const port = process.env.PORT || 8000;
const server = (0, express_1.default)();
// route logging:
server.use((0, morgan_1.default)('tiny'));
// helmet (security middleware):
server.use((0, helmet_1.default)());
// cors middleware if consumer and supplier resides inside the same domain:
server.use((0, cors_1.default)());
// parsing request body:
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// add routes:
server.use('/password', password_route_1.passwords);
// run application:
server.listen(port, () => console.log('Server listening on port ', port));
//# sourceMappingURL=server.js.map