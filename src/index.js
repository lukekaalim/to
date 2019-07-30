class ConvertError extends Error {
  constructor(value, message) {
    super(message);
    this.value = value;
  }
}

class NotAnObjectError extends ConvertError {
  constructor(value) {
    super(value, 'Value was not an Object');
  }
}

class ValueWasNullError extends ConvertError {
  constructor() {
    super(null, 'Value was Null');
  }
}

class PropertyError extends ConvertError {
  constructor(value, property, propertyError) {
    super(value, `Error in property "${property}": ${propertyError.message}`);
    this.property = property;
    this.propertyError = propertyError;
  }
}

const toObject = (converter) => {
  const converters = Object.entries(converter);
  return (value) => {
    if (typeof value !== 'object') {
      throw new NotAnObjectError(value);
    }
    if (value === null) {
      throw new ValueWasNullError();
    }
    const obj = {};
    for (const [propertyName, converter] of converters) {
      try {
        obj[propertyName] = converter(value[propertyName]);
      } catch (error) {
        throw new PropertyError(value, propertyName, error)
      }
    }
    return obj;
  };
};

class NotArrayError extends ConvertError {
  constructor(value) {
    super(value, 'Value was not an array');
  }
}

class ElementError extends ConvertError {
  constructor(value, index, indexError) {
    super(value, `Error in index [${index}]: ${indexError.message}`);
    this.index = index;
    this.indexError = indexError;
  }
}

const toArray = (toElement) => {
  return (value) => {
    if (!Array.isArray(value)) {
      throw new NotArrayError(value);
    }
    const arr = [];
    for (let i = 0; i < value.length; i++) {
      try {
        arr[i] = toElement(value[i]);
      } catch (error) {
        throw new ElementError(value, i, error);
      }
    }
    return arr;
  };
};

class NotStringError extends ConvertError {
  constructor(value) {
    super(value, 'Value was not a string');
  }
}

const toString = (value) => {
  if (typeof value !== 'string') {
    throw new NotStringError();
  }
  return value;
};

class NotNumberError extends ConvertError {
  constructor(value) {
    super(value, 'Value was not a number');
  }
}

const toNumber = (value) => {
  if (typeof value !== 'number') {
    throw new NotNumberError();
  }
  return value;
};

class NotBooleanError extends ConvertError {
  constructor(value) {
    super(value, 'Value was not a boolean');
  }
}

const toBoolean = (value) => {
  if (typeof value !== 'boolean') {
    throw new NotBooleanError();
  }
  return value;
};

const errorClasses = {
  ConvertError,
  NotAnObjectError,
  NotArrayError,
  NotBooleanError,
  NotNumberError,
  NotStringError,
  ValueWasNullError,
  ElementError,
  PropertyError,
}

module.exports = {
  toObject,
  toArray,
  toString,
  toNumber,
  toBoolean,
  ...errorClasses,
};
