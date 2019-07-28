// @flow strict
const { test, expect, expectTrue, assert } = require('lk-test');
const { toString, toNumber, toBoolean } = require('../');

const stringTest = expectTrue('toString(): Expect to return the same string', toString('test') === 'test');
const numberTest = expectTrue('toNumber(): Expect to return the same number', toNumber(10) === 10);
const booleanTest = expectTrue('toBoolean(): Expect to return the same boolean', toBoolean(true) === true);

const expectToThrowError = /*:: <TError>*/(
  function/*: () => mixed*/,
  error/*: TError*/,
) => expect(() => {

});

const toTest = test('@lukekaalim/to', async () => [
  stringTest,
  numberTest,
  booleanTest,
]);

module.exports = {
  toTest,
};