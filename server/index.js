if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'uat') {
  require('./server.bundle.js')
} else {
  require('babel-register')({
    presets: ['env']
  })
  // Import the rest of our application.
  module.exports = require('./server.js')
}