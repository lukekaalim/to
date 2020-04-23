// @flow strict
const { expect, assert } = require('@lukekaalim/test');
const { toAString } = require('./primitive');

const stringTests = expect(() => (
  assert(
    'toAString will return the same string when provided a string',
    'example-string' === toAString('example-string')
  )
));

module.exports = {
  stringTests,
};
