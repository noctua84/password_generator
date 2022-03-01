import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
// routes:
import { passwords } from "./routes/password.route";

const server = express();
// simple route logging middleware:
server.use(morgan('tiny'))

// helmet (security middleware):
server.use(helmet())

// parsing request body:
server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use('/password', passwords)

server.listen(8000, () => console.log('Server listening on port 8000'));