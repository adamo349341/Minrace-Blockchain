const { Worker } = require('worker_threads');
const path = require('path');

class MiningBot {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.difficulty = 3;
  }

  startMining() {
    console.log('⛏️ Mining bot started...');

    setInterval(() => {
      const pendingTransactions = this.blockchain.pendingTransactions;

      if (pendingTransactions.length === 0) {
        console.log('No transactions to mine...');
        return;
      }

      const newBlock = {
        index: this.blockchain.chain.length,
        previousHash: this.blockchain.getLatestBlock().hash,
        timestamp: Date.now(),
        data: pendingTransactions,
      };

      const worker = new Worker(
        path.join(__dirname, './miner-worker.js')
      );

      worker.postMessage({
        block: newBlock,
        difficulty: this.difficulty,
      });

      worker.on('message', (minedBlock) => {
        console.log('✅ Block mined:', minedBlock.hash);

        this.blockchain.addBlock(minedBlock);
        this.blockchain.pendingTransactions = [];
      });

      worker.on('error', (err) => {
        console.error('❌ Worker error:', err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with code ${code}`);
        }
      });

    }, 5000); // mine every 5 seconds
  }
}

module.exports = MiningBot;