const { Transform } = require('stream')
const fs = require('fs')

module.exports = (outputPath, { debug = false } = {}) => {
  let sourceTruth = {}
  let tempSpecialty = ''

  const writable = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk)
        return callback()
      }

      try {
        const { specialty, ...oppositor } = chunk

        if (specialty) {
          if (specialty !== tempSpecialty) {
            sourceTruth = {}
            tempSpecialty = specialty
          }
        } else {
          oppositor.orden = sourceTruth[oppositor.orden]
            ? oppositor.orden + 0.1
            : oppositor.orden

          const {
            nif,
            apellidosynombre,
            puntuacion,
            orden,
            acceso2,
            exp,
          } = oppositor

          sourceTruth[oppositor.orden] = {
            nif,
            apellidosynombre,
            puntuacion,
            orden,
            acceso2,
            exp,
          }
        }
        callback(null, chunk)
      } catch (err) {
        callback(err)
      }
    },
  })
  writable.on('finish', () => {
    fs.writeFileSync(
      `${outputPath}/${tempSpecialty}.json`,
      JSON.stringify(sourceTruth)
    )
  })

  return writable
}
