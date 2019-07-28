const parsePdfs = require('parse-pdfs')
const { getCurrentDate } = require('./helpers/date')
const { getFilePath, existsFile, createPath } = require('./helpers/path')
const extractInfo = require('./util/extractFromStream')
const normalizeInfo = require('./util/normalizeFromStream')
const saveInfo = require('./util/saveFromStream')
const consola = require('consola')
  .withDefaults({ badge: true })
  .withTag('extractApi')

exports.extractApi = {
  list: '',
  specialty: '',
  inputPath: '',
  outputPath: '',
  stream: null,
  from({ list = '', specialty = '', date = getCurrentDate() } = {}) {
    this.list = list
    this.specialty = specialty

    this.inputPath = getFilePath(
      { folder: 'pdf', extension: 'pdf' },
      { list, specialty, date }
    )
    this.outputPath = getFilePath({ folder: 'json' }, { list, specialty, date })

    if (!existsFile(this.inputPath)) {
      consola.error(`The input path: [${this.inputPath}] doens't exist`)
      process.exit(-1)
    }

    consola.success(
      `The list [${list}] with specialty [${specialty ||
        'ALL'}] on date [${date}] is ready`
    )

    return this
  },
  extract(options = { debug: false }) {
    if (options.debug) consola.warn('Debug mode is enabled')

    this.stream = parsePdfs(this.inputPath)
      .pipe(
        extractInfo({ list: this.list, specialty: this.specialty }, options)
      )
      .pipe(
        normalizeInfo({ list: this.list, specialty: this.specialty }, options)
      )

    return this
  },
  split() {},
  save(options = { debug: false }) {
    if (options.debug) {
      this.stream.pipe(process.stdout)
      return
    }

    createPath(this.outputPath)
    this.stream.pipe(saveInfo(this.outputPath, options))

    return new Promise((resolve, reject) => {
      this.stream.on('end', resolve)
      this.stream.on('error', reject)
    })
  },
}
;(async function() {
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'AL',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'EF',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'EI',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'FI',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'FR',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'MU',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'PRI',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'normalList',
      specialty: 'PT',
    })
    .extract({ debug: false })
    .save()
  await exports.extractApi
    .from({
      list: 'bilingualList',
    })
    .extract({ debug: false })
    .save()
})()
