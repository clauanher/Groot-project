//process.stdout.write('\x1B[2J\x1B[0f')
require('dotenv').config()
const { checkConnection, syncModels } = require('./database/index')
const addRelationsToModels = require('./database/index') 
const Users = require("./api/models/users.model")
const Stars = require("./api/models/stars.model")
const Constellations = require("./api/models/constellations.model")

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncMySQL() {
    await checkConnection()
    //addRelationsToModels()
    await syncModels('force')
}

function initializeAndListenWithExpress() {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('./api/routes'))

        .listen(3000, () => {
            console.log(`> Listening on port: ${3000}`)
        })
}
async function startAPI() {
    await checkAndSyncMySQL()
    initializeAndListenWithExpress()
}

startAPI()

