const express = require('express')
const uuid = require('uuid/v4')
const logger = require('./logger')


const store = require('./data-store')
const testUrl = require('./testUrl')

const bodyParser = express.json()
const bookmarksRouter = express.Router()



