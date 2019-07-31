const os = require('os')
const { Transform } = require('stream')

let readerChunk = new Transform({
  readableObjectMode: true,
})

exports.joinChunk = () => {
  let chunkReduce = ''
  const writer = new Transform({
    transform(chunk, encoding, callback) {
      chunkReduce += chunk
      callback()
    },
  })

  writer.on('end', () => {
    chunkReduce
      .toString()
      .split(os.EOL)
      .forEach(chunk => readerChunk.push(chunk))
    readerChunk = new Transform({
      readableObjectMode: true,
    })
  })

  return writer
}

exports.getChunk = () => readerChunk
