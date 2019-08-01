const to = require('./index');

const tagListToString = tags => tags.map(tag => `"${tag}"`).join(', ');

class UnknownUnionTagError extends to.ConvertError {
  constructor(value, tagName, expectedTags, unexpectedTag) {
    super(
      value,
      `Could not determine disjoint union on property ${tagName},` +
      ` since "${unexpectedTag}" isn't included in the tag list: ${tagListToString(expectedTags)}`
    );
    this.tagName = tagName;
  }
}

const toDisjointUnion = (tagName, converterMap) => {
  const tags = Object.keys(converterMap);
  return (value) => {
    if (typeof value !== 'object') {
      throw new to.NotAnObjectError(value);
    }
    if (value === null) {
      throw new to.ValueWasNullError();
    }
    const tag = value[tagName];
    if (!tags.includes(tag)) {
      throw new UnknownUnionTagError(value, tagName, tags, tag);
    }
    return converterMap[tag](value);
  };
};

class UnknownUnionError extends to.ConvertError {
  constructor(value, expectedTags) {
    super(value, `Could not determine union since "${value}"` +
    ` was not an expected tag: "${tagListToString(expectedTags)}"`);
  }
}

const toUnion = (unionMap) => {
  const tags = Object.keys(unionMap);
  return (value) => {
    const tag = to.toString(value);
    if (!tags.includes(tag)) {
      throw new UnknownUnionError(tag, tags);
    }
    return unionMap[tag];
  };
};

module.exports = {
  toDisjointUnion,
  toUnion,
};
