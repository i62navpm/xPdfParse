const lengthToLineBreak = require('../config/lineBreaks')

module.exports = function fixLineBreak(list) {
  let concactWithNext = ''

  function checkNeedToFixLineBreak(chunk) {
    return chunk.length < lengthToLineBreak[list]
  }

  function checkIfChunkTemporarily() {
    return !!concactWithNext
  }

  function saveChunkTemporarily(chunk) {
    concactWithNext = chunk
  }

  function mergeChunkWithTemporarily(chunk) {
    chunk = concactWithNext + chunk
    concactWithNext = ''
    return chunk
  }

  return {
    checkNeedToFixLineBreak,
    checkIfChunkTemporarily,
    saveChunkTemporarily,
    mergeChunkWithTemporarily,
  }
}
