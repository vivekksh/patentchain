// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PatentRegistry {

    struct Patent {
        uint256 id;
        address inventor;
        string title;
        string ipfsHash;
        uint256 timestamp;
        address owner;
    }

    uint256 public patentCount;

    mapping(uint256 => Patent) public patents;

    event PatentRegistered(
        uint256 id,
        address inventor,
        string title,
        uint256 timestamp
    );

    function registerPatent(string memory _title, string memory _ipfsHash) public {

        patentCount++;

        patents[patentCount] = Patent(
            patentCount,
            msg.sender,
            _title,
            _ipfsHash,
            block.timestamp,
            msg.sender
        );

        emit PatentRegistered(
            patentCount,
            msg.sender,
            _title,
            block.timestamp
        );
    }

    function getPatent(uint256 _patentId) public view returns (Patent memory) {
        return patents[_patentId];
    }

    function transferOwnership(uint256 _patentId, address _newOwner) public {

    require(msg.sender == patents[_patentId].owner, "Not the owner");

    patents[_patentId].owner = _newOwner;
}


}