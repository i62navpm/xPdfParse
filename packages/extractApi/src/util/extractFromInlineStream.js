const { Transform } = require('stream')
const oppositorHelper = require('../helpers/oppositor')
const fixLineBreak = require('../helpers/fixLineBreak')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractFromInlineStream')

module.exports = ({ list, specialty }, { debug = false } = {}) => {
  const op = oppositorHelper({ list, specialty })
  const fixLB = fixLineBreak(list)

  return new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk + '\n')
        return callback()
      }

      try {
        if (fixLB.checkIfChunkTemporarily()) {
          chunk = fixLB.mergeChunkWithTemporarily(chunk)
          const { specialty, ...oppositor } = op.getOppositor(chunk)
          this.push({ specialty })
          this.push(oppositor)
        } else if (op.isOppositor(chunk)) {
          if (fixLB.checkNeedToFixLineBreak(chunk)) {
            fixLB.saveChunkTemporarily(chunk)
            return callback()
          }
          const { specialty, ...oppositor } = op.getOppositor(chunk)
          this.push({ specialty })
          this.push(oppositor)
        }

        callback()
      } catch (err) {
        consola.log(chunk.toString())
        callback(err)
      }
    },
  })
}
