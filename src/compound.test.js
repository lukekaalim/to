// @flow strict
const { assert, expect } = require('@lukekaalim/test');
const { toObject, toArray } = require('./compound');

const objectTests = expect(() => {
  const toUser = toObject({
    name: value => value,
  });
  return assert(
    'toObject will return an object of the right shape',
    toUser({ name: 'name' }).name === 'name',
  );
});

module.exports = {
  objectTests,
};
