// @flow strict
const { toAString, toNumber, toArray, toObject, toNullable } = require('../');

/*::
type User = {
  name: string,
  age: ?number,
  id: string,
  history: Array<{ editor: string, time: string }>,
}
*/

const toUser/*: mixed => User*/ = toObject({
  name: toAString,
  age: toNullable(toNumber),
  id: toAString,
  history: toArray(toObject({
    editor: toAString,
    time: toAString,
  })),
});

console.log(toUser({
  name: 'luke',
  id: '123',
  history: [
    { editor: 'luke', time: 'now' },
    { editor: '',  time: '' }
  ],
}))