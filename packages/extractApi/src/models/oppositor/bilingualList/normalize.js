const normalizeData = require('../../../helpers/normalizeData')

module.exports = function normalize(oppositor) {
  return {
    nif: normalizeData.normalizeNif(oppositor.nif),
    apellidosynombre: normalizeData.normalizeApellidosynombre(
      oppositor.apellidosynombre
    ),
    puntuacion: normalizeData.normalizePuntuacion(oppositor.puntuacion),
    orden: normalizeData.normalizeOrden(oppositor.orden),
    acceso2: normalizeData.normalizeAcceso2(oppositor.acceso2),
    exp: normalizeData.normalizeExp(oppositor.exp),
  }
}
