const PORT = process.env.PORT || 3000
const SOCKETIO_PORT = 3001

module.exports = {
  serverName: 'chicken-coop-api',
  mongodb: {
    uri: 'mongodb://localhost:27017/chicken-coop',
    options: {
      autoReconnect: true,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      keepAlive: 120
    }
  },
  tokenSecret: 'supersecrettoken69',
  PORT,
  SOCKETIO_PORT
}
