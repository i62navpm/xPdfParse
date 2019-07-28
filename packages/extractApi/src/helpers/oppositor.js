const regex = require('../config/regex')

module.exports = ({ list }) => {
  const { oppositor: opRegex } = regex[list]
  const { check: checkOp, capture: captureOp } = opRegex

  function getOppositor(chunk) {
    const { groups } = captureOp.exec(chunk) || {}
    return groups
  }

  function isOppositor(chunk) {
    return checkOp.test(chunk.toString().trimStart())
  }

  return {
    getOppositor,
    isOppositor,
  }
}
