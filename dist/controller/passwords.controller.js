"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswords = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Password generator function
 * This function follows a functional approach to the problem.
 * It is designed to be used in a post request context assuming that the user input is made via a form.
 *
 * @param req
 * @param res
 */
function generatePasswords(req, res) {
    let min = parseInt(req.body.min);
    let max = min + 15;
    let specialChars = parseInt(req.body.specialChars);
    let numbers = parseInt(req.body.numbers);
    let passwords = parseInt(req.body.passwords);
    // if any value is NaN, return a user sane error message with HTTP-Status 400: Bad Request.
    if (isNaN(min) || isNaN(max) || isNaN(specialChars) || isNaN(numbers) || isNaN(passwords)) {
        return res.status(400).json({
            "result": "error",
            "message": "one or more parameters are not in the correct format"
        });
    }
    const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const specialCharsList = ["!", "§", "$", "&", "/", "(", ")", "?", "-", "_", "#", "@", "^", "* "];
    const charCodes = Array.from(Array(26)).map((_, i) => i + 97);
    const charList = charCodes.map(code => String.fromCharCode(code));
    const upper = charList.map(letter => letter.toUpperCase());
    charList.concat(upper);
    let count = 0;
    let passwordList = [];
    while (count < passwords) {
        const length = crypto_1.default.randomInt(min, max);
        let passwordElements = [];
        // add required numbers to password elements array
        for (let i = 0; i < numbers; i++) {
            passwordElements.push(String(numberList[crypto_1.default.randomInt(numberList.length)]));
        }
        // add required special chars to password elements array
        for (let i = 0; i < specialChars; i++) {
            passwordElements.push(specialCharsList[crypto_1.default.randomInt(specialCharsList.length)]);
        }
        // add the remaining chars:
        for (let i = passwordElements.length; i < length; i++) {
            passwordElements.push(charList[crypto_1.default.randomInt(charList.length)]);
        }
        let password = (randomShufflePasswordChars(passwordElements)).join('');
        passwordList.push(password);
        count += 1;
    }
    return res.status(200).json({
        "result": "success",
        "passwords": passwordList
    });
}
exports.generatePasswords = generatePasswords;
// internal functions:
/**
 * internal function to randomly shuffle the generated set of password elements.
 * @param passwordElements
 */
function randomShufflePasswordChars(passwordElements) {
    let count = passwordElements.length;
    while (count > 0) {
        const randomIndex = crypto_1.default.randomInt(passwordElements.length);
        count -= 1;
        const temp = passwordElements[count];
        passwordElements[count] = passwordElements[randomIndex];
        passwordElements[randomIndex] = temp;
    }
    return passwordElements;
}
//# sourceMappingURL=passwords.controller.js.map