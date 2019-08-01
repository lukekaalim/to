# `@lukekaalim/to`

[![CircleCI](https://circleci.com/gh/lukekaalim/to.svg?style=svg)](https://circleci.com/gh/lukekaalim/to)

There and ~~back again~~.

## Installation

```bash
npm i @lukekaalim/to
```

##  Usage

```javascript
const { toString, toNumber, toObject } = require('@lukekaalim/to');

const toUser = toObject({
  name: toString,
  age: toNumber,
  meta: toObject({
    createdAt: toNumber,
    modifiedAt: toNumber,
  }),
});

const userJson = `
{
  "name": "luke",
  "age": 24,
  "meta": { "createdAt": 0, "modifiedAt": 0 }
}
`;

const user = toUser(JSON.parse(userJson));
```

Recursive object structure checking for typing those pesky models.

## API

#### toAString
```javascript
const { toAString } = require('@lukekaalim/to');

const name = toAString('luke'); // name === 'luke'
```
Identity if the value is a string, throw a `NotStringError` if not.
Naming is seperate than other (Normall would be `toString`) but is different to avoid naming clashes with the standard `object.toString();` method

#### toNumber
```javascript
const { toNumber } = require('@lukekaalim/to');

const age = toNumber(25); // age === 25
```
Identity if the value is a number, throw a `NotNumberError` if not.

#### toBoolean
```javascript
const { toBoolean } = require('@lukekaalim/to');

const isDev = toBoolean(true); // isDev === true
```
Identity if the value is a boolean, throw a `NotBooleanError` if not.

#### toObject
```javascript
const { toObject } = require('@lukekaalim/to');

const toLukeName = value => {
  if (value === 'luke') {
    return value;
  }
  throw new Error('I\'m not luke!');
};

const toLuke = toObject({
  name: toLukeName,
});

const luke = toLuke({ name: 'luke' });
```
Given a map of converters, creates a function that accepts an object (Throws a `NotObjectError` or `ValueWasNullError` error if not), and **creates a new object** with properties based on running the arguments through the converter who's key is the property's key. A converted just needs to accept any value, and return anything.

If a converter throws an error, that error is wrapped in a `PropertyError`.

#### toArray
```javascript
const { toArray } = require('@lukekaalim/to');

const toFunc = value => {
  if (typeof value === 'function') {
    return value;
  }
  throw new Error('Not a function!');
};

const toFuncArray = toArray(toFunc);

const funcArray = toFuncArray([console.log, console.error]);
```
Given a converter, creates a function that accepts an array (Throws a `NotArrayError` error if not), and **creates a new array** with elements based on running the converter through each element. A converter just needs to accept any value, and return anything.

If a element throws an error, that error is wrapped in a `ElementError`.
