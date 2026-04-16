const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// static frontend
app.use(express.static(path.join(__dirname, 'public')));

// routes
const blockchainRoutes = require('./routes/blockchain');
app.use('/', blockchainRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});