const Wallet = require('./blockchain/Wallet');

const wallet = new Wallet();

console.log("PUBLIC:", wallet.publicKey);
console.log("PRIVATE:", wallet.privateKey);