const { Transform } = require('stream')
const specialtyModel = require('../models/specialty')
const oppositorModel = require('../models/oppositor')

module.exports = ({ list, specialty }, { debug = false } = {}) => {
  const sp = specialtyModel({ list, specialty })
  const op = oppositorModel({ list, specialty })

  return new Transform({
    async transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk)
        return callback()
      }

      try {
        const { specialty, ...oppositor } = JSON.parse(chunk.toString())
        if (specialty) {
          const { data } = await sp
            .from({ specialty })
            .normalize()
            .validate()
          this.push(JSON.stringify(data))
        } else {
          const { data } = await op
            .from(oppositor)
            .normalize()
            .validate()
          this.push(JSON.stringify(data))
        }
        callback()
      } catch (err) {
        console.log(chunk.toString())
        callback(err)
      }
    },
  })
}
