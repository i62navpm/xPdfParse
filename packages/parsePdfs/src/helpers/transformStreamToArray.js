const os = require('os')
const { Transform } = require('stream')

module.exports = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    chunk
      .toString()
      .split(os.EOL)
      .forEach(item => this.push(item))
    callback()
  },
})
