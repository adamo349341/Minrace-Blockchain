const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 50;

        // 🔥 AUTO-MINING CONFIG
        this.targetTime = 300000; // 5 minutes (300000 ms)
        this.lastBlockTime = Date.now();
    }

    createGenesisBlock() {
        return new Block(Date.now(), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(minerAddress) {
        const startTime = Date.now();

        const rewardTx = new Transaction(null, minerAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );

        block.mineBlock(this.difficulty);

        const endTime = Date.now();
        const miningTime = endTime - this.lastBlockTime;

        // 🔥 DIFFICULTY ADJUSTMENT
        if (miningTime < this.targetTime) {
            this.difficulty++;
        } else if (this.difficulty > 1) {
            this.difficulty--;
        }

        this.chain.push(block);
        this.pendingTransactions = [];
        this.lastBlockTime = endTime;

        console.log("⛏ Block mined");
        console.log("⏱ Mining time:", (miningTime / 1000).toFixed(2), "sec");
        console.log("⚙ Difficulty:", this.difficulty);
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include addresses');
        }

        if (!transaction.isValid()) {
            throw new Error('Invalid transaction');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalance(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address) balance -= tx.amount;
                if (tx.toAddress === address) balance += tx.amount;
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.calculateHash()) return false;
            if (current.previousHash !== previous.hash) return false;

            for (const tx of current.transactions) {
                if (!tx.isValid()) return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;