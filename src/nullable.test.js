// @flow strict
const { toNullable } = require('./nullable');
const { expect, assert } = require('@lukekaalim/test');

const nullableTest = expect(() => {
  const toUser = () => 'user';
  const nullableUser = toNullable(toUser);
  return assert(
    'nullableTest',
    nullableUser(null) === null,
  );
});

const shouldReturnUser = expect(() => {
  const toUser = () => 'user';
  const nullableUser = toNullable(toUser);
  return assert(
    'shouldReturnUser',
    nullableUser('user') === 'user',
  );
});

module.exports = {
  nullableTest,
  shouldReturnUser,
};
