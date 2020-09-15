const { getDBUrl, loadEnv, initDB } = require('./src/initialize')
// const logger = require('./src/utils/logger')
const Url = require('./src/models/user')

loadEnv()
initDB(getDBUrl())

async function query(){
  const urls = await Url.find({originUrl: "https://qrcheck-dev.now.sh/goodchurch?code=wdwd-200909-1303-2106"}).lean()
  console.log(urls)
  process.exit()
}

query()





