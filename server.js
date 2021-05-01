require('dotenv-safe').config({ path: `./.env.${process.env.NODE_ENV}` })
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const app = express()
const initMongo = require('./app/config/mongo')

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// for parsing json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// Init all other stuff
app.use(cors())
app.use(passport.initialize())
app.use(require('./app/routes'))
if (process.env.NODE_ENV !== 'test') {
  app.listen(app.get('port'))
}

// Init MongoDB
initMongo()

module.exports = app // for testing
