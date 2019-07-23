const parseNormalList = require('./normalList')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractInfo')

try {
  consola.log('Parsing "normalList"')
  parseNormalList()
} catch (err) {
  console.error(err)
}
