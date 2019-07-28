const { Transform } = require('stream')
const specialtyHelper = require('../helpers/specialty')
const oppositorHelper = require('../helpers/oppositor')
const fixLineBreak = require('../helpers/fixLineBreak')

module.exports = (
  { list, specialty },
  { debug = false, specialtyInline = false } = {}
) => {
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
        if (specialtyInline) {
          if (fixLB.checkIfChunkTemporarily()) {
            chunk = fixLB.mergeChunkWithTemporarily(chunk)
            const { specialty, ...oppositor } = op.getOppositor(chunk)
            this.push(JSON.stringify({ specialty }))
            this.push(JSON.stringify(oppositor))
          } else if (op.isOppositor(chunk)) {
            if (fixLB.checkNeedToFixLineBreak(chunk)) {
              fixLB.saveChunkTemporarily(chunk)
              return callback()
            }
            const { specialty, ...oppositor } = op.getOppositor(chunk)
            this.push(JSON.stringify({ specialty }))
            this.push(JSON.stringify(oppositor))
          }
        } else {
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
        }
        callback()
      } catch (err) {
        console.log(JSON.stringify(chunk.toString()))
        callback(err)
      }
    },
  })
}
