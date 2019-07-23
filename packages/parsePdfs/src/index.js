const stream = require('stream')
const util = require('util')
const fileToStream = require('./helpers/fileToStream')
const streamToArray = require('./helpers/transformStreamToArray')

const pipeline = util.promisify(stream.pipeline)

module.exports = async function(inputFileStream = '', transforms = []) {
  if (!inputFileStream) throw new Error('There is not a input file stream')

  return pipeline([
    fileToStream(inputFileStream).stdout,
    streamToArray,
    ...transforms,
  ])
}
