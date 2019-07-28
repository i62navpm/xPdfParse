const fileToStream = require('./helpers/fileToStream')
const streamToArray = require('./helpers/transformStreamToArray')
module.exports = function(inputFileStream = '') {
  if (!inputFileStream) throw new Error('There is not a input file stream')

  return fileToStream(inputFileStream).stdout.pipe(streamToArray())
}
