const {hasProps} = require('mingutils')

const validateCode = (code) => {
  if (typeof code !== 'string') {
    return false
  }
  return /^.+-\d{6}-\d{4}-\d{4}$/.test(code)
}

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
const urlReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

module.exports = {
  validateCode,
  hasProps,
  urlReg,
}
