"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet_1 = require("helmet");
var morgan = require("morgan");
var server = express();
var generatePassword = require('./routes/password.route');
// route logging:
server.use(morgan('tiny'));
// helmet (security):
server.use((0, helmet_1.default)());
// parsing request body:
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/password', generatePassword);
server.listen(8000, function () { return console.log('Server listening on port 8000'); });
//# sourceMappingURL=server.js.map