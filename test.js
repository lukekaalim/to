// @flow strict
const { toTest } = require('./test/testTo');
const { recursiveColorReporter } = require('lk-test');

const main = async () => {
  const assertion = await toTest.test();
  console.log(recursiveColorReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

if (require.main === module) {
  main();
}