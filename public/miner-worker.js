const { parentPort } = require('worker_threads');
const crypto = require('crypto');


function calculateHash(index, previousHash, timestamp, data, nonce) {
  return crypto
    .createHash('sha256')
    .update(index + previousHash + timestamp + JSON.stringify(data) + nonce)
    .digest('hex');
}


function mineBlock(block, difficulty) {
  let nonce = 0;
  let hash = '';

  const target = '0'.repeat(difficulty);

  while (true) {
    hash = calculateHash(
      block.index,
      block.previousHash,
      block.timestamp,
      block.data,
      nonce
    );

    if (hash.substring(0, difficulty) === target) {
      return { nonce, hash };
    }

    nonce++;
  }
}


parentPort.on('message', ({ block, difficulty }) => {
  const result = mineBlock(block, difficulty);

  parentPort.postMessage({
    ...block,
    nonce: result.nonce,
    hash: result.hash,
  });
});