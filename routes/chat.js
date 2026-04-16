const express = require('express');
const router = express.Router();
const axios = require('axios');
const { getChainContext } = require('../utils/chainContext');

router.post('/api/chat', async (req, res) => {
    try {
        const context = getChainContext();
        const response = await axios.post('https://api.ollama.com/chat', {
            context,
            message: req.body.message
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Ollama API:', error);
        res.status(500).json({ error: 'Ollama API unavailable' });
    }
});

module.exports = router;
