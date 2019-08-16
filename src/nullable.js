// @flow strict

const toNullable = /*:: <TValue>*/(converter/*: mixed => TValue*/)/*: (mixed => TValue | null)*/ => {
  return (value/*: mixed*/) => {
    if (value === null) {
      return value;
    }
    return converter(value);
  };
};

module.exports = {
  toNullable,
};
