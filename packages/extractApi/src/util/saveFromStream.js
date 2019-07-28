const { Transform } = require('stream')
const fs = require('fs')

module.exports = (outputPath, { debug = false } = {}) => {
  let tempSpecialty = ''
  let writeStream = null

  return new Transform({
    transform(chunk, encoding, callback) {
      if (debug) {
        this.push(chunk)
        return callback()
      }

      try {
        const { specialty, ...oppositor } = JSON.parse(chunk.toString())

        if (specialty) {
          if (specialty !== tempSpecialty) {
            writeStream && writeStream.end()
            writeStream = fs.createWriteStream(
              `${outputPath}/${specialty}.json`,
              {
                autoClose: false,
              }
            )
            tempSpecialty = specialty
          }
        } else {
          writeStream && writeStream.write(JSON.stringify(oppositor) + '\n')
        }
        callback()
      } catch (err) {
        callback(err)
      }
    },
  })
}
