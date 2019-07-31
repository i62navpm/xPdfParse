const parsePdfs = require('parse-pdfs')
const { getCurrentDate } = require('./helpers/date')
const { getFilePath, existsFile, createPath } = require('./helpers/path')
const extractInfo = require('./util/extractFromStream')
const extractFromInlineInfo = require('./util/extractFromInlineStream')
const normalizeInfo = require('./util/normalizeFromStream')
const saveInfo = require('./util/saveFromStream')
const saveSourceTruth = require('./util/saveSourceStream')
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
      throw new Error(`The input path: [${this.inputPath}] doens't exist`)
    }

    consola.success(
      `The list [${list}] with specialty [${specialty ||
        'ALL'}] on date [${date}] is ready`
    )

    return this
  },
  extract() {
    const extractFn = this.options.extractFromInline
      ? extractFromInlineInfo
      : extractInfo

    this.stream = parsePdfs(this.inputPath).pipe(
      extractFn({ list: this.list, specialty: this.specialty }, this.options)
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
  saveSourceTruth() {
    this.stream = this.stream.pipe(
      saveSourceTruth(this.outputPath, this.options)
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
