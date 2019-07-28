function normalizeSpecialty(data = '') {
  return data.trim().toUpperCase()
}
function normalizeNif(data = '') {
  return data.trim().replace(/\*|·|�/g, '')
}
function normalizeApellidosynombre(data = '') {
  return data
    .trim()
    .toLowerCase()
    .replace(/\s{2,}/g, ' ')
}
function normalizePuntuacion(data = '') {
  return +data.trim().replace(',', '.')
}
function normalizeOrden(data = '') {
  return +data.trim()
}
function normalizeAcceso2(data = '') {
  return !!data
}
function normalizeExp(data = '') {
  return !!data
}
function normalizeDat(data = '') {
  return +data
}
function normalizeTipoVacantes(data = '') {
  return data.trim().replace(/\s+/g, ',')
}

module.exports = {
  normalizeSpecialty,
  normalizeNif,
  normalizeApellidosynombre,
  normalizePuntuacion,
  normalizeOrden,
  normalizeAcceso2,
  normalizeExp,
  normalizeDat,
  normalizeTipoVacantes,
}
