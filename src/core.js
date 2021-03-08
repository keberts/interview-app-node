const _ = require('lodash')
const { parse } = require('date-fns')

/**
 * @param {string} email
 * @returns bool
 */
function isEmail (emailStr) {
  return emailStr.indexOf('@') !== -1
}

/**
 * Ensures dates are formatted as `yyyy-mm-dd`
 * @param {string} dateStr
 * @returns bool
 */
function isDate (dateStr) {
  const components = dateStr.split('-')
  return components.length === 3 &&
    !Number.isNaN(parseInt(components[0])) &&
    !Number.isNaN(parseInt(components[1])) &&
    !Number.isNaN(parseInt(components[2]))
}

/**
 * @param {string} interviewStr
 * @returns bool
 */
function isValid (interviewStr) {
  const components = interviewStr.split(' ')
  return components.length === 6 &&
    !Number.isNaN(components[0]) &&
    isEmail(components[3]) &&
    isDate(components[4]) &&
    ['PASSED', 'FAILED'].includes(_.last(components))
}

/**
 * @param {string} interviewStr
 * @returns Object
 */
function toCandidate (interviewStr) {
  const components = interviewStr.split(' ')
  return {
    id: parseInt(components[0]),
    familyName: components[1],
    givenName: components[2],
    email: components[3],
    birthday: parse(components[4], 'yyyy-MM-dd', new Date()),
    result: _.last(components)
  }
}

/**
 * @param {string} sortMode
 * @param {Object[]} candidates
 * @returns Object[]
 */
function sortRecords (sortMode, candidates) {
  switch (sortMode) {
    case 'id': return _.sortBy(candidates, 'id')
    case 'birthday': return _.sortBy(candidates, 'birthday')
    case 'familyName': return _.sortBy(candidates, 'familyName')
  }
}

module.exports.toCandidate = toCandidate
module.exports.sortRecords = sortRecords
module.exports.isValid = isValid
module.exports.isEmail = isEmail
module.exports.isDate = isDate
