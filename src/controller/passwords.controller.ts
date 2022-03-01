import crypto from 'crypto'
import { Request, Response } from 'express'

/**
 * Password generator function
 * @param req
 * @param res
 */
export function generatePasswords(req: Request, res: Response) {
    const min = req.body.min
    const max = req.body.min + 15
    const specialChars = req.body.specialChars
    const numbers = req.body.numbers
    const passwords = req.body.passwords
    
    const numberList = [1,2,3,4,5,6,7,8,9,0]
    const specialCharsList = ["!","§","$","&","/","(",")","?","-","_","#","@","^","* "]
    const charList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    
    let count = 0
    let passwordList = []
    
    while (count < passwords) {
        const length = crypto.randomInt(min, max)

        let passwordElements = []
        
        // add required numbers to password elements array
        for (let i = 0; i < numbers; i++) {
            passwordElements.push(numberList[crypto.randomInt(numberList.length)])
        }
        
        // add required special chars to password elements array
        for (let i = 0; i < specialChars; i++) {
            passwordElements.push(specialCharsList[crypto.randomInt(specialCharsList.length)])
        }
        
        // add the remaining chars:
        for (let i = passwordElements.length; i < length; i++) {
            passwordElements.push(charList[crypto.randomInt(charList.length)])
        }
        
        let password = (randomShufflePasswordChars(passwordElements)).join('')
        
        passwordList.push(password)
        
        count += 1
    }
    
    return res.json({"result": "done", "passwords": passwordList})
}

// internal functions:
function randomShufflePasswordChars(passwordElements) {
    let count = passwordElements.length
    
    while (count > 0) {
        const randomIndex = crypto.randomInt(passwordElements.length)
        count -= 1
        const temp = passwordElements[count]
        passwordElements[count] = passwordElements[randomIndex]
        passwordElements[randomIndex] = temp
        
        
    }
    
    return passwordElements
}

