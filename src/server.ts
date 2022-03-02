import express, {Application} from 'express'
import helmet from 'helmet'
import expressWinston from 'express-winston'
import winston from 'winston'
import { passwords } from "./routes/password.route"

// init application:
const server: Application = express()

// route logging:
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}
if (!process.env.DEBUG) { loggerOptions.meta = false }
server.use(expressWinston.logger(loggerOptions))

// helmet (security middleware):
server.use(helmet())

// parsing request body:
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// add routes:
server.use('/password', passwords)

// run application:
server.listen(8000, () => console.log('Server listening on port 8000'))