const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
// app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))


// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
