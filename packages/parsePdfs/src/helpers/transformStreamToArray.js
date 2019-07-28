const os = require('os')
const { Transform } = require('stream')

module.exports = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      chunk
        .toString()
        .split(os.EOL)
        .forEach(chunk => this.push(chunk))
      callback()
    },
  })
