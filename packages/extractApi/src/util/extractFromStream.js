const { Transform } = require('stream')
const specialtyHelper = require('../helpers/specialty')
const oppositorHelper = require('../helpers/oppositor')
const fixLineBreak = require('../helpers/fixLineBreak')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractFromStream')

module.exports = ({ list, specialty }, { debug = false } = {}) => {
  const sp = specialtyHelper({ list, specialty })
  const op = oppositorHelper({ list, specialty })
  const fixLB = fixLineBreak(list)

  return new Transform({
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(JSON.stringify(chunk.toString()) + '\n')
        return callback()
      }

      try {
        if (fixLB.checkIfChunkTemporarily()) {
          chunk = fixLB.mergeChunkWithTemporarily(chunk)
          this.push(JSON.stringify(op.getOppositor(chunk)))
        } else if (sp.isSpecialty(chunk)) {
          this.push(
            JSON.stringify(specialty ? { specialty } : sp.getSpecialty(chunk))
          )
        } else if (op.isOppositor(chunk)) {
          if (fixLB.checkNeedToFixLineBreak(chunk)) {
            fixLB.saveChunkTemporarily(chunk)
            return callback()
          }
          this.push(JSON.stringify(op.getOppositor(chunk)))
        }

        callback()
      } catch (err) {
        consola.error(JSON.stringify(chunk.toString()))
        callback(err)
      }
    },
  })
}
