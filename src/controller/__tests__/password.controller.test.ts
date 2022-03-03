import {generatePasswords} from "../passwords.controller";

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

const mockResponse = () => {
    const res: any = {
        status: jest.fn(),
        json: jest.fn()
    }
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)

    return res
}


describe('generatePasswords', () => {
    test('should 400 if request body has no valid numbers', () => {
        const req = mockRequest("eins", 2, 4, 6)
        const res = mockResponse()

        generatePasswords(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            "result": "error",
            "message": "one or more parameters are not in the correct format"
        })
    })

    test('should 200 with json payload if body has correct number params', () => {
        const req = mockRequest(8, 2, 4, 6)
        const res = mockResponse()

        generatePasswords(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })
})