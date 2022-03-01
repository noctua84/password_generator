import express from 'express';
import { generatePasswords } from "../controller/passwords.controller";

const passwords = express.Router()

passwords.post('/generate', generatePasswords)

export { passwords }