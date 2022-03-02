import express, { Request, Response } from 'express'
import { generatePasswords } from "../controller/passwords.controller"
import {PasswordController} from "../controller/passwords.controller.cls";

const passwords = express.Router()


// post route based on a functional approach.
// this approach is designed in assumption of a form for the required user input
passwords.post('/v1/generate', generatePasswords)

// post route based on a class based approach.
// the assumption for this route is the same as for the functional approach.
passwords.post('/v2/generate', (req: Request, res: Response) => {
    const controller = new PasswordController()
    const result = controller.generatePasswords(req.body)

    if (result["result"] === "error") {
        return res.status(400).json(result)
    }
    else {
        return res.status(200).json(result)
    }
})

export { passwords }