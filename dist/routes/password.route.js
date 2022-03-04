"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwords = void 0;
const express_1 = __importDefault(require("express"));
const passwords_controller_1 = require("../controller/passwords.controller");
const passwords_controller_cls_1 = require("../controller/passwords.controller.cls");
const passwords = express_1.default.Router();
exports.passwords = passwords;
// post route based on a functional approach.
// this approach is designed in assumption of a form for the required user input
passwords.post('/v1/generate', passwords_controller_1.generatePasswords);
// post route based on a class based approach.
// the assumption for this route is the same as for the functional approach.
passwords.post('/v2/generate', (req, res) => {
    const controller = new passwords_controller_cls_1.PasswordController();
    const result = controller.generatePasswords(req.body);
    if (result["result"] === "error") {
        return res.status(400).json(result);
    }
    else {
        return res.status(200).json(result);
    }
});
//# sourceMappingURL=password.route.js.map