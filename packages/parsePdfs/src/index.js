const path = require('path')
const fileToStream = require('./helpers/fileToStream')
const streamToArray = require('./helpers/transformStreamToArray')
const ArrayToObject = require('./helpers/transformArrayToObject')

const child = fileToStream(path.join(__dirname, '/../pdfs/test.pdf'))

child.stdout
  .pipe(streamToArray)
  .pipe(ArrayToObject)
  .pipe(process.stdout)

module.exports = 'watch changes'
