const { Transform } = require('stream')

function getSpecialty(specialty) {
  const specialtyMapObject = {
    '001': 'PRI',
    '002': 'EI',
    '003': 'MU',
    '004': 'EF',
    '005': 'FI',
    PS: 'PT',
    AS: 'AL',
  }

  return specialtyMapObject[specialty] || specialty
}
module.exports = (outputPath, { insertDate = '', debug = false } = {}) => {
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
        let { specialty, ...oppositor } = chunk

        if (specialty) {
          if (specialty !== tempSpecialty) {
            sourceTruth = require(`${outputPath}/${getSpecialty(
              specialty
            )}.json`)
            tempSpecialty = specialty
          }
        } else {
          let oppData = sourceTruth[oppositor.orden]

          if (!oppData) {
            let result = Object.entries(sourceTruth).filter(
              ([, opp]) =>
                opp.nif === oppositor.nif &&
                opp.puntuacion === oppositor.puntuacion
            )
            if (result.length !== 1) {
              throw new Error('Problems looking for the oppositor')
            }
            const [, resultData] = result[0]
            oppData = resultData
          }

          chunk = { ...oppositor, ...oppData }
          if (insertDate) chunk = { ...chunk, date: insertDate }
        }
        callback(null, chunk)
      } catch (err) {
        callback(err)
      }
    },
  })

  return writable
}
