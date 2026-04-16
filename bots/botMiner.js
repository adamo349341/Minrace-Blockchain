const axios = require('axios');
const crypto = require('crypto');

class MiningBot {
    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => {
            this.mine();
        }, this.speed);
    }

    stop() {
        clearInterval(this.interval);
    }

    async mine() {
        try {
            const challenge = await this.fetchChallenge();
            const nonce = this.findNonce(challenge);
            await this.submitBlock(nonce);
        } catch (error) {
            console.error('Mining error:', error);
        }
    }

    async fetchChallenge() {
        const response = await axios.get('/api/challenge');
        return response.data;
    }

    findNonce(challenge) {
        // Implement nonce finding logic
        return crypto.randomBytes(32).toString('hex');
    }

    async submitBlock(nonce) {
        await axios.post('/api/submitBlock', { nonce });
    }
}

module.exports = MiningBot;
