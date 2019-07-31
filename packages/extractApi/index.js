const { extractApi } = require('./src')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractApi')

const normalList = [
  {
    list: 'normalList',
    specialty: 'AL',
  },
  {
    list: 'normalList',
    specialty: 'EF',
  },
  {
    list: 'normalList',
    specialty: 'EI',
  },
  {
    list: 'normalList',
    specialty: 'FI',
  },
  {
    list: 'normalList',
    specialty: 'FR',
  },
  {
    list: 'normalList',
    specialty: 'MU',
  },
  {
    list: 'normalList',
    specialty: 'PRI',
  },
  {
    list: 'normalList',
    specialty: 'PT',
  },
]

const bilingualList = [
  {
    list: 'bilingualList',
  },
]

const voluntaryList = [
  {
    list: 'voluntaryList',
  },
]

async function init() {
  try {
    for (const list of normalList) {
      await extractApi
        .from(list, { debug: false })
        .extract()
        .normalize()
        .saveSourceTruth()
        .save()
    }
  } catch (err) {
    consola.error(`[NormalList]${err}`)
  }
  try {
    for (const list of bilingualList) {
      await extractApi
        .from(list, { debug: false })
        .extract()
        .normalize()
        .save()
    }
  } catch (err) {
    consola.error(`[BilingualList]${err}`)
  }
  try {
    for (const list of voluntaryList) {
      await extractApi
        .from(list, { debug: false, extractFromInline: true })
        .extract()
        .normalize()
        .save()
    }
  } catch (err) {
    consola.error(`[VoluntaryList]${err}`)
  }
}

init()
