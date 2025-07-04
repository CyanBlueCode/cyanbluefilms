const assert = require('assert');
const fetch = require('node-fetch');

// eslint-disable-next-line func-style
async function testWorker() {
  const workerUrl = process.env.WORKER_URL;

  console.log('Testing Cloudflare Worker...');

  // Test valid request
  const validResponse = await fetch(
    `${workerUrl}/folder-images?folder=/portfolio/street`
  );
  assert.strictEqual(validResponse.status, 200);

  const images = await validResponse.json();
  assert(Array.isArray(images));
  console.log(`✅ Received ${images.length} images`);

  // Test missing folder parameter
  const invalidResponse = await fetch(`${workerUrl}/folder-images`);
  assert.strictEqual(invalidResponse.status, 400);

  console.log('✅ All tests passed!');
}

testWorker().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
