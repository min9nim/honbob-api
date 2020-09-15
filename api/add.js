const { getDBUrl, loadEnv, initDB } = require('../src/initialize')
const allowCors = require('../src/utils/cors')
const User = require('../src/models/user')

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress,
    )
  ) {
    return true
  }
  return false
}

const handler = async (req, res) => {
  try {
    loadEnv()
    initDB(getDBUrl())

    const {name} = req.body
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null)

    if (!ValidateIPaddress(ip)) {
      throw Error('Invalid IP')
    }

    const asis = await User.findOne({ip, name}).lean()
    if(asis){
      throw Error('Duplicate user')
    }
    await User.create({ name, ip })
    res.json({
      status: 'ok',
    })
  } catch (e) {
    res.json({
      status: 'failed',
      message: e.message,
    })
  }
}

module.exports = allowCors(handler)
