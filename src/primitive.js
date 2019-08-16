// @flow strict
class ConvertError extends Error {
  value/*: mixed*/
  constructor(value/*: mixed*/, message/*: string*/) {
    super(message);
    this.value = value;
  }
}

class NotStringError extends ConvertError {
  constructor(value/*: mixed*/) {
    super(value, 'Value was not a string');
  }
}

const toAString = (value/*: mixed*/) => {
  if (typeof value !== 'string') {
    throw new NotStringError();
  }
  return value;
};

class NotNumberError extends ConvertError {
  constructor(value/*: mixed*/) {
    super(value, 'Value was not a number');
  }
}

const toNumber = (value/*: mixed*/) => {
  if (typeof value !== 'number') {
    throw new NotNumberError();
  }
  return value;
};

class NotBooleanError extends ConvertError {
  constructor(value/*: mixed*/) {
    super(value, 'Value was not a boolean');
  }
}

const toBoolean = (value/*: mixed*/) => {
  if (typeof value !== 'boolean') {
    throw new NotBooleanError();
  }
  return value;
};

module.exports = {
  ConvertError,
  NotBooleanError,
  NotNumberError,
  NotStringError,
  toBoolean,
  toNumber,
  toAString,
};
