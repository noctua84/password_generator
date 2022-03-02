import crypto from 'crypto'
import {Request, Response} from 'express'

/**
 * Password generator function
 * This function follows a functional approach to the problem.
 * It is designed to be used in a post request context assuming that the user input is made via a form.
 *
 * @param req
 * @param res
 */
export function generatePasswords(req: Request, res: Response) {
    let min: number = parseInt(req.body.min)
    let max: number = min + 15
    let specialChars: number = parseInt(req.body.specialChars)
    let numbers: number = parseInt(req.body.numbers)
    let passwords: number = parseInt(req.body.passwords)

    // if any value is NaN, return a user sane error message with HTTP-Status 400: Bad Request.
    if (isNaN(min) || isNaN(max) || isNaN(specialChars) || isNaN(numbers) || isNaN(passwords)) {
        return res.status(400).json({
            "result": "error",
            "message": "one or more parameters are not in the correct format"
        })
    }

    const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const specialCharsList = ["!", "§", "$", "&", "/", "(", ")", "?", "-", "_", "#", "@", "^", "* "]

    const charCodes: Array<number> = Array.from(Array(26)).map((_, i) => i + 97)
    const charList: Array<string> = charCodes.map(code => String.fromCharCode(code))
    const upper: Array<string> = charList.map(letter => letter.toUpperCase())
    charList.concat(upper)

    let count: number = 0
    let passwordList: Array<string> = []

    while (count < passwords) {
        const length = crypto.randomInt(min, max)

        let passwordElements: Array<string> = []

        // add required numbers to password elements array
        for (let i = 0; i < numbers; i++) {
            passwordElements.push(String(numberList[crypto.randomInt(numberList.length)]))
        }

        // add required special chars to password elements array
        for (let i = 0; i < specialChars; i++) {
            passwordElements.push(specialCharsList[crypto.randomInt(specialCharsList.length)])
        }

        // add the remaining chars:
        for (let i = passwordElements.length; i < length; i++) {
            passwordElements.push(charList[crypto.randomInt(charList.length)])
        }

        let password: string = (randomShufflePasswordChars(passwordElements)).join('')

        passwordList.push(password)

        count += 1
    }

    return res.json({
        "result": "success",
        "passwords": passwordList
    })

}

// internal functions:
/**
 * internal function to randomly shuffle the generated set of password elements.
 * @param passwordElements
 */
function randomShufflePasswordChars(passwordElements: Array<string>): Array<string> {
    let count = passwordElements.length

    while (count > 0) {
        const randomIndex: number = crypto.randomInt(passwordElements.length)
        count -= 1
        const temp: string = passwordElements[count]
        passwordElements[count] = passwordElements[randomIndex]
        passwordElements[randomIndex] = temp
    }

    return passwordElements
}

