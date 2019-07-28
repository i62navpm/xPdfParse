const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')
const { docPath } = require('../config')

exports.getFilePath = ({ folder, extension }, { list, specialty, date }) => {
  let filename = extension
    ? specialty
      ? `${list}/${specialty}.${extension}`
      : `${list}.${extension}`
    : list

  return path.resolve(docPath, folder, date, filename)
}

exports.existsFile = filePath => {
  return fs.existsSync(filePath)
}

exports.createPath = filePath => {
  return fsExtra.mkdirpSync(filePath + '/')
}
