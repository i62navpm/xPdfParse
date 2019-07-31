const { Transform } = require('stream')
const fs = require('fs')

module.exports = (outputPath, { debug = false } = {}) => {
  const sourceTruth = {}
  let tempSpecialty = ''

  const writable = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk)
        return callback()
      }

      try {
        const { specialty, ...oppositor } = chunk

        if (specialty) {
          if (specialty !== tempSpecialty) {
            sourceTruth[specialty] = {}
            tempSpecialty = specialty
          }
        } else {
          sourceTruth[tempSpecialty][oppositor.orden] = oppositor
        }
        callback()
      } catch (err) {
        callback(err)
      }
    },
  })
  writable.on('finish', () => {
    fs.writeFileSync(
      `${outputPath}/sourceTruth.json`,
      JSON.stringify(sourceTruth),
      { flag: 'a' }
    )
  })

  return writable
}
