const { default: createLogger, consoleTransport, simpleFormat } = require('if-logger')
const moment = require('moment')

moment.locale('ko')

function customTransport (level, message, formatMessage) {
  /*
   * level: 'debug'
   * message: 'some text'
   * formatMessage: '[debug] some text'
   */
  // api.pushLog(level + ' : ' + message)
}

module.exports = createLogger({
  format: simpleFormat,
  tags: [() => moment().utc().add(9, 'hours').format('MM/DD HH:mm:ss')],
  transports: [consoleTransport, customTransport]
})
