const { expect } = require('chai')
const { hasProps, urlReg } = require('../utils')

describe('utils', () => {
  it('hasProps', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(hasProps(['a', 'b', 'c'])(obj)).to.equal(true)
    expect(hasProps(['a', 'b'])(obj)).to.equal(true)
    expect(hasProps(['c'])(obj)).to.equal(true)
    expect(hasProps(['a', 'b', 'd'])(obj)).to.equal(false)
    expect(hasProps(['d'])(obj)).to.equal(false)
  })
  it('validation of url', () => {
    expect(urlReg.test('https://naver.com')).to.equal(true)
    expect(urlReg.test('https1://naver.com')).to.equal(false)
    expect(urlReg.test('http://naver2.com')).to.equal(true)
    expect(urlReg.test('aaaa')).to.equal(false)
  })
})
