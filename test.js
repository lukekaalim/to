// @flow strict
const { stringTests } = require('./src/primitive.test');
const { objectTests } = require('./src/compound.test');
const { nullableTest, shouldReturnUser } = require('./src/nullable.test');
const { expectAll, colorReporter } = require('@lukekaalim/test');

const main = async () => {
  const assertion = await expectAll('@lukekaalim/to', [
    stringTests,
    objectTests,
    nullableTest,
    shouldReturnUser,
  ]).test()
  console.log(colorReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

if (require.main === module) {
  main();
}