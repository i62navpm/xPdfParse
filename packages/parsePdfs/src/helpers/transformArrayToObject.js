const { Transform } = require('stream')

module.exports = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n')
    callback()
  },
})
