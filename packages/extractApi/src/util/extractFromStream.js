const { Transform } = require('stream')
const specialtyHelper = require('../helpers/specialty')
const oppositorHelper = require('../helpers/oppositor')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractFromStream')

module.exports = ({ list, specialty }, { debug = false } = {}) => {
  const sp = specialtyHelper({ list, specialty })
  const op = oppositorHelper({ list, specialty })

  return new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk + '\n')
        return callback()
      }

      try {
        if (sp.isSpecialty(chunk)) {
          this.push(specialty ? { specialty } : sp.getSpecialty(chunk))
        } else if (op.isOppositor(chunk)) {
          this.push(op.getOppositor(chunk))
        }

        callback()
      } catch (err) {
        consola.error(chunk.toString())
        callback(err)
      }
    },
  })
}
