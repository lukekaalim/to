// @flow strict
const { test, expect, expectTrue, assert, expectToThrowError } = require('lk-test');
const { toAString, toNumber, toBoolean, toObject, toArray, NotStringError, NotNumberError, NotBooleanError } = require('../src/main');

const happyTests = test('Happy paths', async () => [
  expectTrue('toAString(): Expect to return the same string', toAString('test') === 'test'),
  expectTrue('toNumber(): Expect to return the same number', toNumber(10) === 10),
  expectTrue('toBoolean(): Expect to return the same boolean', toBoolean(true) === true),
]);

const errorTests = test('throwing appropriate errors', async () => [
  expectToThrowError('toAString() throws NotStringError when not a string', () => toAString(123), NotStringError),
  expectToThrowError('toNumber() throws NotNumberError when not a number', () => toNumber('123'), NotNumberError),
  expectToThrowError('toBoolean() throws NotBooleanError when not a boolean', () => toBoolean(123), NotBooleanError),
]);

const complexTest = test('Complex case:', async () => {
  const toUserArray = toArray(toObject({ id: toAString, index: toNumber }));
  const userArray = [{ id: '123', index: 10 }, { id: '456', index: 50 }];

  const result = toUserArray(userArray);
  
  return [
    expectTrue('ID should match', result[0].id === '123'),
    expectTrue('ID should match', result[1].id === '456'),
    expectTrue('index should match', result[0].index === 10),
    expectTrue('index should match', result[1].index === 50),
  ];
});

const toTest = test('index tests', async () => [
  happyTests,
  errorTests,
  complexTest,
]);

module.exports = {
  toTest,
};