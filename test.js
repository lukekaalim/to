// @flow strict
const { toTest } = require('./test/testTo');
const { extrasTest } = require('./src/extras.test');
const { recursiveColorReporter, expectAll } = require('lk-test');

const main = async () => {
  const assertion = await expectAll('@lukekaalim/to', [toTest, extrasTest]).test()
  console.log(recursiveColorReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

if (require.main === module) {
  main();
}