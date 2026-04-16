const express = require('express');
const router = express.Router();

// shared blockchain instance
const Blockchain = require('../blockchain/Blockchain');
const blockchain = new Blockchain();

// GET full chain
router.get('/', (req, res) => {
    res.json(blockchain.chain);
});

// GET block by index
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const block = blockchain.chain[index];

    if (block) {
        res.json(block);
    } else {
        res.status(404).json({ error: 'Block not found' });
    }
});

module.exports = router;