module.exports = {
  mongodb: {
    uri: process.env.MONGO_HOST,
    options: {
      authSource: 'admin',
      'auth.user': process.env.MONGO_USER,
      'auth.password': process.env.MONGO_PASS
    }
  }
}
