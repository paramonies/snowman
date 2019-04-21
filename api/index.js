const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
