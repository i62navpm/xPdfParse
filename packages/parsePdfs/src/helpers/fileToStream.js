const { spawn } = require('child_process')

module.exports = function(fileSource, fileDestination = '-') {
  return spawn('pdftotext', [
    '-table',
    '-enc',
    'UTF-8',
    fileSource,
    fileDestination,
  ])
}
