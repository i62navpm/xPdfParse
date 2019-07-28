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
  options: { debug: false },
  list: '',
  specialty: '',
  inputPath: '',
  outputPath: '',
  stream: null,
  from(
    { list = '', specialty = '', date = getCurrentDate() } = {},
    options = {}
  ) {
    this.list = list
    this.specialty = specialty
    this.options = { ...this.options, ...options }

    if (this.options.debug) consola.warn('Debug mode is enabled')

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
  extract() {
    this.stream = parsePdfs(this.inputPath).pipe(
      extractInfo({ list: this.list, specialty: this.specialty }, this.options)
    )
    return this
  },
  normalize() {
    this.stream = this.stream.pipe(
      normalizeInfo(
        { list: this.list, specialty: this.specialty },
        this.options
      )
    )
    return this
  },
  save() {
    if (this.options.debug) {
      this.stream.pipe(process.stdout)
      return Promise.resolve()
    }

    createPath(this.outputPath)
    this.stream.pipe(saveInfo(this.outputPath, this.options))

    return new Promise((resolve, reject) => {
      this.stream.on('end', resolve)
      this.stream.on('error', reject)
    })
  },
}
;(async function() {
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'AL',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'EF',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'EI',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'FI',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'FR',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'MU',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'PRI',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'normalList',
        specialty: 'PT',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'bilingualList',
      },
      { debug: false }
    )
    .extract()
    .normalize()
    .save()
  await exports.extractApi
    .from(
      {
        list: 'voluntaryList',
      },
      { debug: false, specialtyInline: true }
    )
    .extract()
    .normalize()
    .save()
})()
