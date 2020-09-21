const allowCors = require('../src/utils/cors')
const axios = require('axios')
const {ValidateIPaddress} = require('../src/utils')

const handler = async (req, res) => {
  try {
    const {ip} = req.body
    if (!ValidateIPaddress(ip)) {
      throw Error('Invalid IP')
    }
    const result = await axios.get(`http://api.ipstack.com/${ip}?access_key=4448b8b2be662b3927372b0c185b30d7&format=1`)
    res.json({
      status: 'ok',
      result: result.data,
    })
  } catch (e) {
    console.error(e)
    res.json({
      status: 'failed',
      message: e.message,
    })
  }
}

module.exports = allowCors(handler)
