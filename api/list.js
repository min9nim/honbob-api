const { getDBUrl, loadEnv, initDB } = require('../src/initialize')
const allowCors = require('../src/utils/cors')
const User = require('../src/models/user')


const handler = async (req, res) => {
  loadEnv()
  initDB(getDBUrl())

  try {
    const docs = await User.find().lean
    res.json({
      status: 'ok',
      result: docs,
    })
  } catch (e) {
    res.json({
      status: 'failed',
      message: e.message,
    })
  }
}

module.exports = allowCors(handler)
