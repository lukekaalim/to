// @flow strict
const main = require('./main');
const extra = require('./extra');

module.exports = {
  ...extra,
  ...main,
};