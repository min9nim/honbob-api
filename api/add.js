const { getDBUrl, loadEnv, initDB } = require('../src/initialize')
const allowCors = require('../src/utils/cors')
const User = require('../src/models/user')

loadEnv()
initDB(getDBUrl())

const handler = async (req, res) => {
  try {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null)
    await User.create({ name: req.body.name, ip })
  } catch (e) {
    res.json({
      status: 'failed',
      message: e.message,
    })
  }
}

module.exports = allowCors(handler)
