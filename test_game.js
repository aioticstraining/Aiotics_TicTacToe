// A simple unit test to check if a function returns true.
// This is for demonstration purposes in the CI pipeline.

const assert = require('assert');

// A simple function that always returns true.
function isAppWorking() {
return true;
}

// === Test Case ===
// This test will always pass, ensuring the test stage of the pipeline succeeds.
assert.strictEqual(isAppWorking(), true, "Test Failed: The function should return true.");

console.log("Unit test passed successfully!");
