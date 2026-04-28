# 🧩 Web3 Mini Project — My First Blockchain Integration

This project is a **Decentralized Application (DApp)** that demonstrates the integration between a React frontend and a smart contract deployed on the Ethereum Sepolia test network.

The main goal is to demonstrate the basic Web3 execution flow:

“ A web application interacts directly with a smart contract on the blockchain. ”

---

## ⚙️ Application Architecture

React UI  
↓  
ethers.js  
↓  
MetaMask (transaction signing)  
↓  
Smart Contract (Solidity / OpenZeppelin)  
↓  
Sepolia Blockchain  
↓  
Etherscan Explorer  

---

## 📦 Technologies Used

- React (Vite)
- TypeScript
- ethers.js
- MetaMask
- Solidity ^0.8.20
- OpenZeppelin Contracts
- Ethereum Sepolia Testnet
- Remix IDE

---

## 🧠 Smart Contract — Web3Registry

The contract is based on **ERC-20 (OpenZeppelin)** and combines three independent modules in a single on-chain system.

---

### 🪙 ERC-20 Token (W3T)

Name: Web3Token  
Symbol: W3T  
Initial supply: 1000 tokens minted to deployer  

Functions:
- transferTokens(address to, uint256 amount)
- getBalance(address user)

---

### 📌 Case 1 — On-chain Status Registry

Implements an immutable event logging system on the blockchain.

Stores:
- message
- timestamp
- sender address

Functions:
- updateStatus(string message)
- getRecord(uint index)
- getTotalRecords()

Event:
- StatusUpdated

Use case: decentralized audit logging and traceability

---

### 🔐 Case 2 — Hash Verification System

A cryptographic integrity validation mechanism for files.

Functions:
- registerHash(bytes32 fileHash)
- verifyHash(bytes32 fileHash)

Features:
- prevents duplicate hash registration
- tracks ownership of registered hashes
- enables verification of file authenticity

Use cases:
- document validation
- digital certificates
- data integrity proofs

---

### 🪙 Case 3 — ERC-20 Token Transfer

Standard token functionality using OpenZeppelin ERC-20 implementation.

Functions:
- transferTokens()
- balanceOf()

Use case:
- basic decentralized financial system simulation (DeFi concept)

---

## 🖥️ Frontend (React + ethers.js)

The user interface is built with React (Vite) and interacts with the blockchain through ethers.js and MetaMask.

### Project Structure

src/
  components/
    WalletInfo.tsx
    StatusForm.tsx
    TokenTransfer.tsx
    HashVerifier.tsx

  contract/
    index.ts

  hooks/
    useWallet.ts

  App.tsx
  main.tsx

---

## 🔄 Application Flow

1. User opens the application  
2. Connects MetaMask wallet  
3. Selects Sepolia network  
4. Frontend calls smart contract via ethers.js  
5. MetaMask requests transaction confirmation  
6. Smart contract executes function  
7. Transaction is recorded on-chain  
8. Result is visible on Etherscan  

---

## 🚀 Deployment

- Tool: Remix IDE  
- Network: Sepolia Testnet  
- Wallet: MetaMask (Injected Provider)  
- Testing: Faucet ETH used for gas fees  

---

## 📊 Project Evidence

✔ Smart contract deployed on Sepolia  
✔ On-chain transactions confirmed  
✔ Functional React frontend  
✔ Full Web3 integration working end-to-end  

---

## 🧩 Conclusion

This project demonstrates a fully functional Web3 DApp integrating:

- React frontend  
- ethers.js Web3 library  
- MetaMask wallet  
- Solidity smart contract  
- Ethereum Sepolia blockchain  

It implements a hybrid smart contract architecture combining:

- On-chain logging system  
- ERC-20 token logic  
- Cryptographic hash verification  

This represents a simplified but realistic model of a modular decentralized application.
```
