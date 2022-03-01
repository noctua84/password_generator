"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswords = void 0;
var crypto = require("crypto");
function generatePasswords(req, res) {
    var min = req.body.min;
    var max = req.body.min + 15;
    var specialChars = req.body.specialChars;
    var numbers = req.body.numbers;
    var passwords = req.body.passwords;
    var numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var specialCharsList = ["!", "§", "$", "&", "/", "(", ")", "?", "-", "_", "#"];
    var charList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var count = 0;
    var passwordList = [];
    while (count < passwords) {
        var length_1 = crypto.randomInt(min, max);
        var passwordElements = [];
        // add required numbers to password elements array
        for (var i = 0; i < numbers; i++) {
            passwordElements.push(numberList[crypto.randomInt(numberList.length)]);
        }
        // add required special chars to password elements array
        for (var i = 0; i < specialChars; i++) {
            passwordElements.push(specialCharsList[crypto.randomInt(specialCharsList.length)]);
        }
        // add the remaining chars:
        for (var i = passwordElements.length; i < length_1; i++) {
            passwordElements.push(charList[crypto.randomInt(charList.length)]);
        }
        var password = (randomShufflePasswordChars(passwordElements)).join('');
        passwordList.push(password);
        count += 1;
    }
    return res.json({ "result": "done", "passwords": passwordList });
}
exports.generatePasswords = generatePasswords;
function randomShufflePasswordChars(passwordElements) {
    var count = passwordElements.length;
    while (count > 0) {
        var randomIndex = crypto.randomInt(passwordElements.length);
        count -= 1;
        var temp = passwordElements[count];
        passwordElements[count] = passwordElements[randomIndex];
        passwordElements[randomIndex] = temp;
    }
    return passwordElements;
}
module.exports = generatePasswords;
//# sourceMappingURL=passwords.controller.js.map