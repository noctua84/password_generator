"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passwords_controller_1 = require("../controller/passwords.controller");
var passwords = express.Router();
passwords.post('/generate', passwords_controller_1.generatePasswords);
module.exports = passwords;
//# sourceMappingURL=password.route.js.map