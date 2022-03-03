import {PasswordController} from "../passwords.controller.cls";

const mockRequest = (min: any, symbols: any, numbers: any, passwords: any) => {
    const req: any = {
        body: {
            min: min,
            specialChars: symbols,
            numbers: numbers,
            passwords: passwords
        }
    }

    return req
}

describe('generate passwords', () => {
    let generator: PasswordController

    beforeEach(() => {
        generator = new PasswordController()
    })

    test('should return with error if any param is not a valid number', () => {
        const req = mockRequest("zehn", 4, 3, 10)
        const result = generator.generatePasswords(req.body)

        expect(result.result).toBe("error")
        expect(result.message).toBe("one or more parameters are in the wrong format")
    })

    test('should return with success and a list of passwords if all parameters are valid', () => {
        const req = mockRequest(12, 4, 3, 10)
        const result = generator.generatePasswords(req.body)

        expect(result.passwords).toHaveLength(req.body.passwords)
        expect(result.result).toBe("success")
    })
})