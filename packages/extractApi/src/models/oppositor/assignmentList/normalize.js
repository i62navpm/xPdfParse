const normalizeData = require('../../../helpers/normalizeData')

module.exports = function normalize(oppositor) {
  return {
    nif: normalizeData.normalizeNif(oppositor.nif),
    apellidosynombre: normalizeData.normalizeApellidosynombre(
      oppositor.apellidosynombre
    ),
    orden: normalizeData.normalizeOrden(oppositor.orden),
    asignacion: normalizeData.normalizeAsignacion(oppositor.asignacion),
    tipovacante: normalizeData.normalizeTipoVacantes(oppositor.tipovacante),
    dat: normalizeData.normalizeDatName(oppositor.dat),
    jornada: normalizeData.normalizeJornada(oppositor.jornada),
  }
}
