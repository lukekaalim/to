// @flow strict
const { expectAll, test, expect, expectTrue, assert, expectToThrowError } = require('lk-test');
const { toDisjointUnion } = require('./extra');

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
  ];
});

const extrasTest = expectAll('Extra converters', [
  disjointUnionTest
]);

module.exports = {
  extrasTest
};