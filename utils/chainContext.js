const blockchain = require('../blockchain/instance');

function buildChainContext() {
    return {
        blockCount: blockchain.chain.length,
        latestBlock: blockchain.getLatestBlock(),
        mempoolSize: blockchain.mempool.length,
        balances: Object.fromEntries(blockchain.balances)
    };
}

module.exports = { buildChainContext };