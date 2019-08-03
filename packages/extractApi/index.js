const ExtractApi = require('./src')
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
const assignmentList = [
  {
    list: 'assignmentList',
  },
]

async function init() {
  try {
    let extractApi = new ExtractApi()
    for (const list of normalList) {
      await extractApi
        .from(list, { debug: false })
        .extract()
        .normalize()
        .validate()
        .saveSourceTruth()
        .save()
    }
  } catch (err) {
    consola.error(`[NormalList]${err}`)
  }

  try {
    let extractApi = new ExtractApi()
    for (const list of bilingualList) {
      await extractApi
        .from(list, { debug: false })
        .extract()
        .normalize()
        .getFromSourceTruth()
        .validate()
        .save()
    }
  } catch (err) {
    consola.error(`[BilingualList]${err}`)
  }
  try {
    let extractApi = new ExtractApi()
    for (const list of voluntaryList) {
      await extractApi
        .from(list, { debug: false, extractFromInline: true })
        .extract()
        .normalize()
        .getFromSourceTruth()
        .validate()
        .save()
    }
  } catch (err) {
    consola.error(`[VoluntaryList]${err}`)
  }
  try {
    let extractApi = new ExtractApi()
    for (const list of assignmentList) {
      await extractApi
        .from(list, { debug: false })
        .extract()
        .normalize()
        .getFromSourceTruth()
        .validate()
        .save()
    }
  } catch (err) {
    consola.error(`[AssignmentList]${err}`)
  }
}

init()
