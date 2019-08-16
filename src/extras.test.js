// @flow strict
const { expectAll, test, expect, expectTrue, assert, expectToThrowError } = require('lk-test');
const { toDisjointUnion, toUnion, UnknownUnionTagError, UnknownUnionError } = require('./extra');
const { ValueWasNullError, NotAnObjectError } = require('./main');

const disjointUnionTest = test('Disjoint Union', async () => {
  const toRed = ()/*: 'red'*/ => 'red';
  const toBlue = ()/*: 'blue'*/ => 'blue';

  const toColor = toDisjointUnion('color', {
    red: toRed,
    blue: toBlue,
  });

  return [
    expectTrue('Union should switch color (blue)', toColor({ color: 'blue' }) === 'blue'),
    expectTrue('Union should switch color (red)', toColor({ color: 'red' }) === 'red'),
    expectToThrowError('Converter should throw if value is not in union', () => toColor({ color: 'green' }), UnknownUnionTagError),
    expectToThrowError('Converter should throw if value is null', () => toColor(null), ValueWasNullError),
    expectToThrowError('Converter should throw if value is not an object', () => toColor('a string literal'), NotAnObjectError),
  ];
});

const unionTest = test('Union', async () => {
  const toColor = toUnion({ red: 'color-red', blue: 'color-blue' });
  // flow test
  (toColor('red')/*: 'color-red' | 'color-blue'*/);

  return [
    expectTrue('Union should map input to object property (red)', toColor('red') === 'color-red'),
    expectTrue('Union should map input to object property (blue)', toColor('blue') === 'color-blue'),
    expectToThrowError('Converter should throw if value is not in union', () => toColor('banana'), UnknownUnionError),
  ];
});

const extrasTest = expectAll('Extra converters', [
  disjointUnionTest,
  unionTest,
]);

module.exports = {
  extrasTest
};