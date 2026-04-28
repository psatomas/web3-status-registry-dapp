// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3Registry is ERC20 {

    constructor() ERC20("Web3Token", "W3T") {
        // Mint inicial para o deployer
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // =========================
    // 📌 CASO 1 - STATUS REGISTRY
    // =========================

    struct Record {
        string message;
        uint256 timestamp;
        address sender;
    }

    Record[] public records;

    event StatusUpdated(address indexed sender, string message, uint256 timestamp);

    function updateStatus(string memory _message) public {
        records.push(Record({
            message: _message,
            timestamp: block.timestamp,
            sender: msg.sender
        }));

        emit StatusUpdated(msg.sender, _message, block.timestamp);
    }

    function getRecord(uint256 index)
        public
        view
        returns (string memory, uint256, address)
    {
        Record memory r = records[index];
        return (r.message, r.timestamp, r.sender);
    }

    function getTotalRecords() public view returns (uint256) {
        return records.length;
    }

    // =========================
    // 🪙 CASO 2 - TOKEN TRANSFER (ERC20)
    // =========================

    function transferTokens(address to, uint256 amount) public returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function getBalance(address user) public view returns (uint256) {
        return balanceOf(user);
    }

    // =========================
    // 🔐 CASO 3 - HASH VERIFICATION
    // =========================

    mapping(bytes32 => bool) public verifiedHashes;
    mapping(bytes32 => address) public hashOwner;

    event HashRegistered(bytes32 indexed fileHash, address indexed sender, uint256 timestamp);

    function registerHash(bytes32 _fileHash) public {
        require(!verifiedHashes[_fileHash], "Hash already registered");

        verifiedHashes[_fileHash] = true;
        hashOwner[_fileHash] = msg.sender;

        emit HashRegistered(_fileHash, msg.sender, block.timestamp);
    }

    function verifyHash(bytes32 _fileHash)
        public
        view
        returns (bool, address)
    {
        return (verifiedHashes[_fileHash], hashOwner[_fileHash]);
    }
}