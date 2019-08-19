// @flow strict
const { ConvertError } = require('./primitive');

class NullableError extends ConvertError {
  error/*: Error*/;

  constructor(value/*: mixed*/, error/*: Error*/) {
    super(value, `${error.message}\nError attempting to convert nullable`);
    this.error = error;
  }
}

const toNullable = /*:: <TValue>*/(converter/*: mixed => TValue*/)/*: (mixed => ?TValue)*/ => {
  return (value/*: mixed*/) => {
    if (value === null || value === undefined) {
      return null;
    }
    try {
      return converter(value);
    } catch (error) {
      throw new NullableError(value, error);
    }
  };
};

module.exports = {
  NullableError,
  toNullable,
};
