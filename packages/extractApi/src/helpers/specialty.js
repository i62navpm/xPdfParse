const regex = require('../config/regex')

module.exports = ({ list }) => {
  const { specialty: spRegex } = regex[list]
  const { check: checkSp, capture: captureSp } = spRegex

  function getSpecialty(chunk) {
    const { groups } = captureSp.exec(chunk) || {}
    return groups
  }

  function isSpecialty(chunk) {
    return checkSp.test(chunk.toString())
  }

  return {
    getSpecialty,
    isSpecialty,
  }
}
