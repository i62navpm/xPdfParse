const normalizeData = require('../../../helpers/normalizeData')

module.exports = function normalize(spObject) {
  return {
    specialty: normalizeData.normalizeSpecialty(spObject.specialty),
  }
}
