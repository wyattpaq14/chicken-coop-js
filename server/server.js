import path from 'path'
import http from 'http'

import Express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import bunyan from 'bunyan'
import bunyanExpressLogger from 'express-bunyan-logger'

import mongoose from 'mongoose'

// import global config
import config from 'config'

// import routes
import router from './routes/router'

// create server singleton
const server = new Express()

// Create app
const app = http.createServer(server)

// add config to every req via: req.locals.config
server.locals.config = config

// setup server logging
const serverLog = bunyan.createLogger({
    name: config.serverName,
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
server.locals.serverLog = serverLog
// access server log anywhere via: import { serverLog } from 'server.js'
export default { serverLog }

// setup access logging
server.use(bunyanExpressLogger({
    name: config.serverName,
    streams: [{
        type: 'rotating-file',
        path: path.resolve(__dirname, 'logs/access.log'),
        period: '1d',
        count: 7
    }]
}))

// database setup
const db = mongoose.connection
server.use((req, res, next) => {
    if (db.readyState !== 1) {
        db.openUri(config.mongodb.uri, config.mongodb.options)
        db.on('error', err => {
            serverLog.error({ msg: err.message }, 'MongoDB connection error')
            throw new Error(`Unable to connect to database at ${config.mongodb.uri}. Error: ${err.message}`)
        })
    }
    next()
})

// Express setup
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(compression())

server.use(router(router))


app.listen(config.PORT, error => {
    if (!error) {
        serverLog.info(`Started JaC2 API Server in ${process.env.NODE_ENV} environment on port ${config.PORT}`)
    }
})