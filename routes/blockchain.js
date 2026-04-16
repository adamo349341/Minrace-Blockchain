const express = require('express');
const router = express.Router();

const Blockchain = require('../blockchain/Blockchain');
const Transaction = require('../blockchain/Transaction');
const Wallet = require('../blockchain/Wallet');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const chain = new Blockchain();

let minerAddress = null;


// 🔐 CREATE WALLET
router.get('/wallet/new', (req, res) => {
    const wallet = new Wallet();
    res.json(wallet);
});


// 🔥 SET MINER
router.post('/set-miner', (req, res) => {
    minerAddress = req.body.address;
    res.json({ message: "Miner set successfully" });
});


// 🚰 FAUCET (NEW)
router.get('/faucet/:address', (req, res) => {
    const tx = new Transaction(null, req.params.address, 100);
    chain.pendingTransactions.push(tx);

    res.json({ message: "100 coins added (pending, will confirm after mining)" });
});


// 💸 TRANSACTION (VALIDATED)
router.post('/transaction', (req, res) => {
    const { senderPrivateKey, senderPublicKey, recipient, amount } = req.body;

    try {
        if (!senderPrivateKey || !senderPublicKey || !recipient || amount === undefined) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const parsedAmount = Number(amount);

        if (isNaN(parsedAmount)) {
            return res.status(400).json({ error: "Amount must be a number" });
        }

        if (parsedAmount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        const balance = chain.getBalance(senderPublicKey);

        if (balance < parsedAmount) {
            return res.status(400).json({
                error: "Insufficient balance",
                balance
            });
        }

        const key = ec.keyFromPrivate(senderPrivateKey);

        const tx = new Transaction(senderPublicKey, recipient, parsedAmount);
        tx.signTransaction(key);

        chain.addTransaction(tx);

        res.json({ message: 'Transaction added successfully' });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// ⛏ MANUAL MINING
router.get('/mine', (req, res) => {
    if (!minerAddress) {
        return res.status(400).json({ error: "Set miner first" });
    }

    chain.minePendingTransactions(minerAddress);

    res.json({
        message: 'Block mined',
        difficulty: chain.difficulty
    });
});


// 📊 BLOCKCHAIN
router.get('/blockchain', (req, res) => {
    res.json({
        chain: chain.chain,
        difficulty: chain.difficulty,
        pendingTransactions: chain.pendingTransactions
    });
});


// 💰 BALANCE
router.get('/balance/:address', (req, res) => {
    const balance = chain.getBalance(req.params.address);
    res.json({ balance });
});


// 🔥 AUTO-MINING
setInterval(() => {
    if (chain.pendingTransactions.length > 0 && minerAddress) {
        console.log("⛏ Auto mining...");
        chain.minePendingTransactions(minerAddress);
    }
}, 1000);


module.exports = router;