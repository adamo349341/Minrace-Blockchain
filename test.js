const Blockchain = require('./blockchain/Blockchain');
const Transaction = require('./blockchain/Transaction');
const Wallet = require('./blockchain/Wallet');

const myCoin = new Blockchain();

const wallet1 = new Wallet();
const wallet2 = new Wallet();

// create transaction
const tx1 = new Transaction(wallet1.publicKey, wallet2.publicKey, 100);
tx1.signTransaction(wallet1.key);
myCoin.addTransaction(tx1);

console.log("Mining...");
myCoin.minePendingTransactions(wallet1.publicKey);

console.log("Balance wallet1:", myCoin.getBalance(wallet1.publicKey));
console.log("Balance wallet2:", myCoin.getBalance(wallet2.publicKey));

console.log("Is chain valid?", myCoin.isChainValid());