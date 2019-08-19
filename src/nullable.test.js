// @flow strict
const { toNullable } = require('./nullable');
const { expect, assert, expectToThrow, expectAll } = require('@lukekaalim/test');

const nullableShouldReturnNull = expect(() => {
  const toUser = () => 'user';
  const nullableUser = toNullable(toUser);
  return assert(
    'toNullable should return null when given null',
    nullableUser(null) === null,
  );
});

const nullableShouldReturnUser = expect(() => {
  const toUser = () => 'user';
  const nullableUser = toNullable(toUser);
  return assert(
    'toNullable should pass the value to the converter when provided a valid value',
    nullableUser('user') === 'user',
  );
});

const nullableShouldPassError = expectToThrow('toNullable should throw any errors child converters throw', () => {
  const toUser = () => { throw new Error('I always throw an Error') };
  const toNullableUser = toNullable(toUser);
  toNullableUser('dave the user');
});

const nullableExpectations = expectAll('toNullable', [
  nullableShouldReturnNull,
  nullableShouldReturnUser,
  nullableShouldPassError,
]);

module.exports = {
  nullableExpectations
};
