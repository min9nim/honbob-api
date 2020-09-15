const mongoose = require('mongoose')
const dotenv = require('dotenv')
const logger = require('./utils/logger')

logger.info('NODE_ENV:', process.env.NODE_ENV)

function loadEnv () {
  dotenv.config()
  // const { DB_URL, DB_URL_DEV } = process.env
  // console.log({ DB_URL, DB_URL_DEV })
}

function initDB (dburl) {
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', function () {
    logger.verbose('Connected to mongod server')
  })
  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.connect(dburl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
}

function getDBUrl () {
  const { VERCEL_GITHUB_COMMIT_REF, DB_URL } = process.env
  let dburl = DB_URL
  logger.verbose('NOW_GITHUB_COMMIT_REF = ' + VERCEL_GITHUB_COMMIT_REF)
  // if (VERCEL_GITHUB_COMMIT_REF === 'master') {
  //   dburl = DB_URL
  // }

  logger.info('dburl = ' + dburl)

  return dburl
}

module.exports = {
  loadEnv,
  getDBUrl,
  initDB
}
