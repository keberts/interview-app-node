const core = require('./core')
const { format } = require('date-fns')

test('Make sure properly formatted email addresses pass validation', () => {
	expect(core.isEmail('george@fakeemail.com'))
	  .toBe(true)
	expect(core.isEmail('fakeemail.com'))
	  .toBe(false)
})

test('Ensure all dates are well formatted', () => {
	expect(core.isDate('2020-02-25'))
	  .toBe(true)
	expect(core.isDate('February 25, 2020'))
	  .toBe(false)
})

test('"Make sure test records can be marked (in)valid', () => {
	expect(core.isValid('7 Reed Diana dreed@fake-email.com 1986-12-11 PASSED'))
	  .toBe(true)
	expect(core.isValid('not a real record'))
	  .toBe(false)
})

test('Make sure test records can be parsed', () => {
	const parsedCandidate = core.toCandidate('7 Reed Diana dreed@fake-email.com 1986-12-11 PASSED')
	expect(parsedCandidate.id).toBe(7)
	expect(parsedCandidate.familyName).toBe('Reed')
	expect(parsedCandidate.givenName).toBe('Diana')
	expect(parsedCandidate.email).toBe('dreed@fake-email.com')
	expect(format(parsedCandidate.birthday, 'yyyy-MM-dd'))
		.toBe('1986-12-11')
	expect(parsedCandidate.result).toBe('PASSED')
})
