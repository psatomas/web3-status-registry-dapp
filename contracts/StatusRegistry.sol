// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StatusRegistry {
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

    function getRecord(uint256 index) public view returns (string memory, uint256, address) {
        Record memory r = records[index];
        return (r.message, r.timestamp, r.sender);
    }

    function getTotalRecords() public view returns (uint256) {
        return records.length;
    }
}