// @flow strict
const { expect, assert } = require('@lukekaalim/test');
const { toAString } = require('./primitives');

const stringTests = expect(() => (
  assert(
    'toAString will return the same string when provided a string',
    'example-string' === toAString('example-string')
  )
));

module.exports = {
  stringTests,
};
