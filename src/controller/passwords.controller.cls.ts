import { Request, Response } from 'express';
import crypto from 'crypto';

/**
 * Password generation controller
 */
export class PasswordController {
    numberList: Array<number>
    specialCharsList: Array<string>
    charList: Array<string>

    /**
     * Constructor
     */
    constructor() {
        this.numberList = [1,2,3,4,5,6,7,8,9,0]
        this.specialCharsList = ["!","§","$","&","/","(",")","?","-","_","#","@","^","* "]
        //TODO prepare charList programmatically
    }

    /**
     * Method to generate passwords based on user input.
     * @param req
     * @param res
     */
    generatePasswords(req: Request, res: Response) {
        //TODO modify to handle get and post requests.
        const min = req.body.min;
        const max = req.body.min + 15;
        const symbols = req.body.specialChars;
        const numbers = req.body.numbers;
        const passwords = req.body.passwords;

        let count: number = 0
        let passwordList: Array<string> = []

        while (count < passwords) {
            let curMaster = this.prepareMasterSet(min, max, symbols, numbers)
            const password = (this.shuffleMasterSet(curMaster)).join('')
            passwordList.push(password)
            count++
        }

        return res.json({"result": "done", "passwords": passwordList})
    }

    /**
     * internal function to prepare the master set of chars used to form the actual password
     *
     * @param min user input for minimum length
     * @param max arbitrary calculated maximum length (currently min + 15)
     * @param symbols number of symbols/special chars used in the password
     * @param numbers number of numbers used in the password
     */
    prepareMasterSet(min: number, max: number, symbols: number, numbers: number) {
        const length = crypto.randomInt(min, max)
        let masterSet: Array<string> = []

        // add required numbers to the set:
        for (let i = 0; i < numbers; i++) {
            masterSet.push(String(this.numberList[crypto.randomInt(this.numberList.length)]))
        }

        // add required special chars to the set
        for (let i = 0; i < symbols; i++) {
            masterSet.push(this.specialCharsList[crypto.randomInt(this.specialCharsList.length)])
        }

        // fill the rest with any number of upper or lower case letters
        for (let i = masterSet.length; i < length; i++) {
            masterSet.push(this.charList[crypto.randomInt(this.charList.length)])
        }

        return masterSet
    }

    /**
     * internal method to randomly shuffle the given master set of password chars.
     *
     * @param masterSet a generated set of chars (numbers, symbols, letters) to be randomized in its order.
     */
    shuffleMasterSet(masterSet: Array<string>) {
        let count = masterSet.length

        while (count > 0) {
            const randomIndex = crypto.randomInt(masterSet.length)
            count -= 1
            const temp = masterSet[count]
            masterSet[count] = masterSet[randomIndex]
            masterSet[randomIndex] = temp
        }

        return masterSet
    }
}