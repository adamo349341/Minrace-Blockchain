const API = "http://localhost:3000";

let wallet = null;

// 🔐 CREATE WALLET
async function createWallet() {
  const res = await fetch(API + "/wallet/new");
  wallet = await res.json();

  document.getElementById("wallet").innerText =
    "Public Key:\n" + wallet.publicKey;

  // 🔥 SET AS MINER
  await fetch(API + "/set-miner", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ address: wallet.publicKey })
  });
}

// 🚰 FAUCET
async function getFaucet() {
  if (!wallet) {
    alert("Create wallet first");
    return;
  }

  const res = await fetch(API + "/faucet/" + wallet.publicKey);
  const data = await res.json();

  alert(data.message);
}

// 💸 SEND TRANSACTION
async function sendTransaction() {
  if (!wallet) {
    alert("Create wallet first");
    return;
  }

  const recipient = document.getElementById("to").value;
  const amount = parseInt(document.getElementById("amount").value);

  const res = await fetch(API + "/transaction", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      senderPrivateKey: wallet.privateKey,
      senderPublicKey: wallet.publicKey,
      recipient,
      amount
    })
  });

  const data = await res.json();
  alert(data.message || data.error);
}

// 📊 LOAD BLOCKCHAIN + STATS
async function loadBlockchain() {
  const res = await fetch(API + "/blockchain");
  const data = await res.json();

  document.getElementById("chain").innerText =
    JSON.stringify(data.chain, null, 2);

  document.getElementById("difficulty").innerText =
    "Difficulty: " + data.difficulty;

  document.getElementById("blocks").innerText =
    "Blocks: " + data.chain.length;

  document.getElementById("pending").innerText =
    "Pending TX: " + data.pendingTransactions.length;
}

// 💰 BALANCE
async function loadBalance() {
  if (!wallet) {
    alert("Create wallet first");
    return;
  }

  const res = await fetch(API + "/balance/" + wallet.publicKey);
  const data = await res.json();

  document.getElementById("balance").innerText =
    "Balance: " + data.balance;
}

// 🔁 AUTO REFRESH
setInterval(loadBlockchain, 3000);
loadBlockchain();