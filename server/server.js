import path from 'path'
import http from 'http'

import Express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import bunyan from 'bunyan'
import bunyanExpressLogger from 'express-bunyan-logger'

import mongoose from 'mongoose'

// import global config -- removed will impolment later
// import config from 'config'

// import routes
import router from './routes/router'

// create server singleton
const server = new Express()

// Create app
const app = http.createServer(server)

// add config to every req via: req.locals.config
// server.locals.config = config

// setup server logging
const logger = bunyan.createLogger({
    name: "chicken-coop-api",
    serializers: {
        err: bunyan.stdSerializers.err
    },
    streams: [{
        type: 'rotating-file',
        path: path.resolve(__dirname, 'logs/server.log'),
        period: '1d',
        count: 7
    }]
})
// access server log in req via: req.locals.serverLog
server.locals.logger = logger
// access server log anywhere via: import { serverLog } from 'server.js'
export default { logger }

// setup access logging
server.use(bunyanExpressLogger({
    name: "chicken-coop-api",
    streams: [{
        type: 'rotating-file',
        path: path.resolve(__dirname, 'logs/access.log'),
        period: '1d',
        count: 7
    }]
}))


// mongoose options -- move to config later

const options = {
    "autoReconnect": true,
    "socketTimeoutMS": 30000,
    "connectTimeoutMS": 30000,
    "keepAlive": 120,
    "useNewUrlParser": true
}

const mongodbURI = process.env.DB_URI
// database setup
const db = mongoose.connection
server.use((req, res, next) => {
    if (db.readyState !== 1) {
        db.openUri(mongodbURI, options)
        db.on('error', err => {
            logger.error({ msg: err.message }, 'MongoDB connection error')
            throw new Error(`Unable to connect to database at ${mongodbURI}. Error: ${err.message}`)
        })
    }
    next()
})

// Express setup
server.use(cors())
server.use(bodyParser.json({ type: 'application/json'}))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(compression())

server.use(router(router))

// declare port object -- move to config later
const port = 3000
app.listen(port, error => {
    if (!error) {
        logger.info(`Started Chicken Coop API Server in ${process.env.NODE_ENV} environment on port ${port}`)
        console.log(`Started Chicken Coop API Server in ${process.env.NODE_ENV} environment on port ${port}`)
    }
})