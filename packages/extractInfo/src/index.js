const path = require('path')
// const parseNormalList = require('./normalList')
const parseBilingualList = require('./bilingualList')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractInfo')

async function init() {
  try {
    const [currentDate] = new Date().toISOString().split('T')

    consola.log('Parsing "bilingualList"')
    await parseBilingualList({
      inputPath: path.join(process.cwd(), 'docs/pdfs/bilingualList.pdf'),
      outputPath: path.join(
        process.cwd(),
        `docs/json/bilingualList/${currentDate}/`
      ),
    })

    // consola.log('Parsing "bilingualList"')
    // await parseBilingualList()
  } catch (err) {
    consola.error(err)
  }
}

init()
