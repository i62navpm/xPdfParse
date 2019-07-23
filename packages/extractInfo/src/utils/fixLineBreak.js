module.exports = function fixLineBreak(normalLineWidth = 88) {
  let concactWithNext = ''

  function checkNeedToFixLineBreak(chunk) {
    return chunk.length < normalLineWidth
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
