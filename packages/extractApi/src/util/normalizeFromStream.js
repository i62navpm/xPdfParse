const { Transform } = require('stream')
const specialtyModel = require('../models/specialty')
const oppositorModel = require('../models/oppositor')

module.exports = ({ list, specialty }, { debug = false } = {}) => {
  const sp = specialtyModel({ list, specialty })
  const op = oppositorModel({ list, specialty })

  return new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk)
        return callback()
      }

      try {
        const { specialty, ...oppositor } = chunk
        const { data } = specialty
          ? sp.from({ specialty }).normalize()
          : op.from(oppositor).normalize()
        this.push(data)

        callback()
      } catch (err) {
        console.log(chunk)
        callback(err)
      }
    },
  })
}
