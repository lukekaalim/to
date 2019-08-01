const to = require('./index');

class UnknownUnionTagError extends to.ConvertError {
  constructor(value, tagName, expectedTags, unexpectedTag) {
    const tagListString = expectedTags.map(tag => `"${tag}"`).join(', ');
    super(
      value,
      `Could not determine disjoint union on property ${tagName},` +
      ` since "${unexpectedTag}" isn't included in the tag list: ${tagListString}`
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

module.exports = {
  toDisjointUnion,
};
