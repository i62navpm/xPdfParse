const parseNormalList = require('./normalList')
const parseBilingualList = require('./bilingualList')
// const parseAssignmentList = require('./assignmentList')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractInfo')

async function init() {
  try {
    consola.log('Parsing "normalList"')
    await parseNormalList()

    consola.log('Parsing "bilingualList"')
    await parseBilingualList()

    // consola.log('Parsing "assignmentList"')
    // await parseAssignmentList()
  } catch (err) {
    consola.error(err)
  }
}

init()
