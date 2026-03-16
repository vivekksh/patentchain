# PatentChain

PatentChain is a **decentralized patent registry system built on blockchain** that allows inventors to securely register, verify, and transfer ownership of patents.

The platform uses **Ethereum smart contracts and IPFS decentralized storage** to ensure patent records are immutable, transparent, and publicly verifiable.

---

# Problem Statement

Traditional patent systems suffer from several issues:

* Centralized control
* Slow verification processes
* Risk of document tampering
* Lack of transparency in ownership history

PatentChain solves these problems using **blockchain technology**.

---

# Solution

PatentChain enables inventors to:

* Register patents on the blockchain
* Store patent documents on IPFS
* Verify patents publicly
* Transfer patent ownership securely
* View patents through a dashboard interface

Because the system is decentralized, **records cannot be altered once registered**.

---

# Features

* Blockchain-based patent registration
* IPFS document storage
* Public patent verification system
* Patent ownership transfer
* NFT-style patent visualization
* Patent dashboard with search functionality
* Auto-generated patent certificate (PDF)

---

# Tech Stack

Frontend

* React
* Vite

Blockchain

* Solidity
* Hardhat
* Ethereum (Local Network)

Storage

* IPFS (Pinata)

Wallet

* MetaMask

Libraries

* Ethers.js
* jsPDF

---

# System Architecture

```
User Interface (React)
        ↓
MetaMask Wallet
        ↓
Smart Contract (Solidity)
        ↓
Ethereum Blockchain
        ↓
IPFS Storage (Patent Documents)
```

---

# Project Structure

```
patentchain/
│
├── contracts/
│   └── PatentRegistry.sol
│
├── scripts/
│   └── deploy.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── blockchain/
│   │   │   ├── contract.js
│   │   │   └── ipfs.js
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

Clone the repository

```
git clone https://github.com/yourusername/patentchain.git
```

Install dependencies

```
npm install
```

---

# Run Blockchain

Start local Hardhat network

```
npx hardhat node
```

Deploy the contract

```
npx hardhat run scripts/deploy.js --network localhost
```

---

# Run Frontend

Navigate to frontend folder

```
cd frontend
```

Start the React app

```
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

# How It Works

1. User connects MetaMask wallet.
2. User registers a patent with title and document.
3. Document is uploaded to IPFS.
4. Smart contract stores the IPFS hash on blockchain.
5. Patent becomes permanently registered.
6. Anyone can verify the patent using the public verification system.

---

# Example Workflow

1. Connect wallet
2. Upload patent document
3. Register patent
4. Verify patent using patent ID
5. Transfer ownership if required

---

# Future Improvements

* AI-based prior-art patent search
* Integration with government patent offices
* Patent marketplace
* Smart licensing system
* Multi-chain support

---

# License

This project is for **educational and research purposes**.

---

# Author

Vivek Sharma
