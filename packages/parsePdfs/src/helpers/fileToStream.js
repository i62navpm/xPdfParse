const { spawn } = require('child_process')

module.exports = function(fileSource, fileDestination = '-') {
  return spawn('pdftotext', [
    '-simple',
    '-enc',
    'UTF-8',
    fileSource,
    fileDestination,
  ])
}
