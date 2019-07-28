const normalizeData = require('../../../helpers/normalizeData')

module.exports = function normalize(oppositor) {
  return {
    nif: normalizeData.normalizeNif(oppositor.nif),
    apellidosynombre: normalizeData.normalizeApellidosynombre(
      oppositor.apellidosynombre
    ),
    puntuacion: normalizeData.normalizePuntuacion(oppositor.puntuacion),
    acceso2: normalizeData.normalizeAcceso2(oppositor.acceso2),
    exp: normalizeData.normalizeExp(oppositor.exp),
    tipovacantes: normalizeData.normalizeTipoVacantes(oppositor.tipovacantes),
    norte: normalizeData.normalizeDat(oppositor.norte),
    sur: normalizeData.normalizeDat(oppositor.sur),
    este: normalizeData.normalizeDat(oppositor.este),
    oeste: normalizeData.normalizeDat(oppositor.oeste),
    capital: normalizeData.normalizeDat(oppositor.capital),
  }
}
