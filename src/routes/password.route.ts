import express from 'express';
import { generatePasswords } from "../controller/passwords.controller";
import {PasswordController} from "../controller/passwords.controller.cls";

const passwords = express.Router()
const controller = new PasswordController()

// post route based on a functional approach.
// this approach is designed in assumption of a form for the required user input
passwords.post('/v1/generate', generatePasswords)

// post route based on a class based approach.
// the assuption for this route is the same as for the functional approach.
passwords.post('/v2/generate', controller.generatePasswords)

export { passwords }