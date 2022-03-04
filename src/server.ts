import express, {Application} from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { passwords } from "./routes/password.route"

// init application:
const port = process.env.PORT || 8000
const server: Application = express()

// route logging:
server.use(morgan('tiny'))

// helmet (security middleware):
server.use(helmet())

// cors middleware if consumer and supplier resides inside the same domain:
server.use(cors())

// parsing request body:
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// add routes:
server.use('/password', passwords)

// run application:
server.listen(port, () => console.log('Server listening on port ', port))