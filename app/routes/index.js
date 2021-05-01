const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../utils')

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.status(200).json({
    msg: "Welcome to COVID-19 stats application."
  })
})

/*
 * 404 error message
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router