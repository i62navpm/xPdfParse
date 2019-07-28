const normalizeData = require('../../../helpers/normalizeData')

module.exports = function normalize(oppositor) {
  return {
    nif: normalizeData.normalizeNif(oppositor.nif),
    apellidosynombre: normalizeData.normalizeApellidosynombre(
      oppositor.apellidosynombre
    ),
    puntuacion: normalizeData.normalizePuntuacion(oppositor.puntuacion),
    baremo11: normalizeData.normalizePuntuacion(oppositor.baremo11),
    baremo12: normalizeData.normalizePuntuacion(oppositor.baremo12),
    baremo13: normalizeData.normalizePuntuacion(oppositor.baremo13),
    baremo14: normalizeData.normalizePuntuacion(oppositor.baremo14),
    baremo211: normalizeData.normalizePuntuacion(oppositor.baremo211),
    baremo212: normalizeData.normalizePuntuacion(oppositor.baremo212),
    baremo22: normalizeData.normalizePuntuacion(oppositor.baremo22),
    orden: normalizeData.normalizeOrden(oppositor.orden),
    acceso2: normalizeData.normalizeAcceso2(oppositor.acceso2),
    exp: normalizeData.normalizeExp(oppositor.exp),
  }
}
