const express = require('express');
const router = express.Router();

// ✅ correct import
const blockchain = require('../blockchain/instance');

// Mine block (simple version)
router.get('/', (req, res) => {

    if (blockchain.mempool.length === 0) {
        return res.json({ message: 'No transactions to mine' });
    }

    const newBlock = {
        index: blockchain.chain.length,
        timestamp: Date.now(),
        transactions: blockchain.mempool,
        previousHash: blockchain.getLatestBlock().hash,
        nonce: 0,
        hash: 'mined-hash' // simple placeholder
    };

    blockchain.addBlock(newBlock);
    blockchain.mempool = [];

    res.json({
        message: 'Block mined successfully',
        block: newBlock
    });
});

module.exports = router;