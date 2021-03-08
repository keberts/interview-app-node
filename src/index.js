const fs = require('fs')
const process = require('process')
const path = require('path')
const _ = require('lodash')
const core = require('./core')
const { format } = require('date-fns')

/**
 * @var {string} filePath
 * @returns {string[]}
 */
function readFile (filePath) {
  return fs.readFileSync(path.relative(process.cwd(), filePath), 'utf8')
    .split('\n')
    .slice(0, -1)
}

/**
 * @param {any[]} data
 */
function writeResults (data) {
  console.log('[')

  for (let i = 0; i < data.length; i++) {
    console.log({
      ...data[i],
      birthday: format(data[i].birthday, 'yyyy-MM-dd')
    })
  }

  console.log(']')
}

const [cmd, script, sortMode, ...filePaths] = process.argv
const contents = _.flatMap(filePaths, readFile)
const candidateMaps = contents.map(core.toCandidate)
const sortedData = core.sortRecords(sortMode, candidateMaps)
if (_.every(contents, core.isValid)) {
  writeResults(sortedData)
} else {
  console.log('One or more records was malformed. Please check your input data.')
}
