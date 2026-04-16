const express = require('express');
const router = express.Router();

// use shared blockchain instance
const blockchain = require('../blockchain/instance');

// POST new transaction
router.post('/', (req, res) => {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const transaction = { from, to, amount };

    blockchain.mempool.push(transaction);

    res.json({
        message: 'Transaction added to mempool',
        transaction
    });
});

// GET mempool
router.get('/mempool', (req, res) => {
    res.json(blockchain.mempool);
});

module.exports = router;