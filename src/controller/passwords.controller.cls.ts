import crypto from 'crypto'

interface passwordCreationParams {
    min: number
    specialChars: number
    numbers: number
    passwords: number
}


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
        this.charList = []

        const charCodes = Array.from(Array(26)).map((_, i) => i + 97)
        const lower: Array<string> = charCodes.map(code => String.fromCharCode(code))
        const upper: Array<string> = lower.map(letter => letter.toUpperCase())
        this.charList = this.charList.concat(lower, upper)

        // bind this (object context) to the class method:
        this.generatePasswords = this.generatePasswords.bind(this)
    }

    /**
     * Method to generate passwords based on user input.
     * The method is designed to be used either in context of a post request using a request body
     * emitted by a user filled form
     * this context is preserved by binding this to the method in the constructor.
     *
     * @param reqBody
     */
    public generatePasswords(reqBody: passwordCreationParams) {
        let min: number = reqBody.min
        let max: number = min + 15
        let symbols: number = reqBody.specialChars
        let numbers: number = reqBody.numbers
        let passwords: number = reqBody.passwords

        console.log(min, max, symbols, numbers)

        let count: number = 0
        let passwordList: Array<string> = []

        while (count < passwords) {
            try {
                let curMaster: Array<string> = this.prepareMasterSet(min, max, symbols, numbers)
                const password: string = (this.shuffleMasterSet(curMaster)).join('')
                passwordList.push(password)
                count++
            }
            catch (error) {
                return {
                    "result": "error",
                    "message": "one or more parameters are in the wrong format"
                }
            }
        }

        return {
            "result": "success",
            "passwords": passwordList
        }
    }

    /**
     * internal function to prepare the master set of chars used to form the actual password
     * the function is written as an arrow function to preserve this context.
     *
     * @param min user input for minimum length
     * @param max arbitrary calculated maximum length (currently min + 15)
     * @param symbols number of symbols/special chars used in the password
     * @param numbers number of numbers used in the password
     */
    private prepareMasterSet = (min: number, max: number, symbols: number, numbers: number): Array<string> => {
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
     * the function is written as an arrow function to preserve this context.
     *
     * @param masterSet a generated set of chars (numbers, symbols, letters) to be randomized in its order.
     */
    private shuffleMasterSet = (masterSet: Array<string>): Array<string> => {
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