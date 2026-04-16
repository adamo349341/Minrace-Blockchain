#  Mini Blockchain System (Node.js + Dashboard)

A simplified blockchain simulation built with Node.js featuring Proof of Work, dynamic difficulty adjustment, signed transactions, wallet system, auto-mining, faucet for initial funding, and a live frontend dashboard.

---

##  Features

-  Auto Mining (blocks mined automatically, rewards assigned to active wallet)
-  Dynamic Difficulty (adjusts based on mining time)
-  Secure Transactions (signed with elliptic cryptography, validated before execution)
-  Wallet System (public/private key generation)
-  Faucet (provides initial coins for testing)
-  Live Dashboard (blockchain, difficulty, pending transactions, balance)

---

##  Installation

```bash
git clone https://github.com/adamo349341/Minerace-Blockchain.git
cd  Minerace-Blockchain
npm install

* Run

node server.js

Server:

http://localhost:3000

Open frontend:

index.html


* Usage
Create a wallet
Use faucet to get coins
Send a transaction
Wait for auto-mining
Check balance and blockchain


* API
GET /wallet/new
POST /set-miner
GET /faucet/:address
POST /transaction
GET /mine
GET /blockchain
GET /balance/:address

* Limitations
No decentralization (single node)
No peer-to-peer network
No persistent storage
Simplified mining and validation logic
No full wallet management system

* Concepts

Blockchain structure, Proof of Work, hashing, transaction validation, cryptographic signatures, mining rewards, difficulty adjustment.
* Future Improvements

Multi-node network, database integration, advanced UI, mining competition, real wallet system.
