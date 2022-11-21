// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./interfaces/ISettlement.sol";

contract Settlement is ISettlement {
    mapping(uint => Contract) public contracts;
    uint public currentContractID;

    uint private storageBond = 1 ether;


    function createContract(bytes32 root, uint treeDepth, string calldata ipfsHash, uint timeout) external payable {
        contracts[currentContractID].user = msg.sender;
        contracts[currentContractID].dataRoot = root;
        contracts[currentContractID].treeDepth = treeDepth;
        contracts[currentContractID].storageFee = msg.value;
        contracts[currentContractID].ipfsHash = ipfsHash;
        contracts[currentContractID].timeout = timeout;

        emit ContractCreated(currentContractID, msg.sender, root, treeDepth, msg.value, ipfsHash, timeout);

        unchecked {
            currentContractID++;
        }
    }

    function takeContract(uint contractID) external payable {
        require(
            msg.value >= storageBond &&
            !contracts[contractID].started &&
            !contracts[contractID].ended
        );

        contracts[currentContractID].provider = msg.sender;
        contracts[contractID].started = true;

        emit ContractTaken(contractID);
    }

    function removeContract(uint contractID) external { // Used when no provider takes the contract
        require(
            contracts[contractID].user == msg.sender &&
            !contracts[contractID].started
        );
        
        contracts[contractID].started = true;
        contracts[contractID].ended = true;

        payable(address(msg.sender)).transfer(contracts[contractID].storageFee);

        emit ContractRemoved(contractID);
    }

    
    function initDownloadFee(uint contractID) external payable {
        require(
            msg.sender == contracts[contractID].user &&
            contracts[contractID].started &&
            !contracts[contractID].ended
        );

        contracts[contractID].downloadFee = msg.value;

        emit DownloadFeeInited(contractID, msg.value);
    }

    function payDownloadFee(uint contractID) external {
        require(msg.sender == contracts[contractID].user);

        payable(address(contracts[contractID].provider)).transfer(contracts[contractID].downloadFee);

        contracts[contractID].downloadFee = 0;

        emit DownloadFeePaid(contractID);
    }


    function challenge(uint contractID, bytes32[] calldata leaves) external {
        require(
            contracts[contractID].started &&
            !contracts[contractID].ended &&
            !contracts[contractID].challenging &&
            contracts[contractID].treeDepth == leaves.length
        );

        bytes32 genHash1 = leaves[0];
        bytes32 genHash2 = leaves[0];
        
        for (uint i = 1; i < leaves.length;) {
            if (i % 2 == 0) {
                genHash1 = keccak256(abi.encode(genHash1, leaves[i]));
                genHash2 = keccak256(abi.encode(leaves[i], genHash2));
            } else {
                genHash2 = keccak256(abi.encode(genHash2, leaves[i]));
                genHash1 = keccak256(abi.encode(leaves[i], genHash1));
            }

            unchecked {
                i++;
            }
        }

        bool check1 = genHash1 == contracts[contractID].dataRoot;
        bool check2 = genHash2 == contracts[contractID].dataRoot;

        require(check1 || check2);

        bytes32 chunkHash;

        if (check1) chunkHash = genHash1;
        else chunkHash = genHash2;

        contracts[contractID].currentChunkHash = leaves[0];
        contracts[contractID].challenging = true;
        contracts[contractID].challengeTimeout = block.timestamp;

        emit Challenged(contractID, chunkHash);
    }

    function prove(uint contractID, bytes calldata chunk) external {
        require(
            contracts[contractID].challenging &&
            contracts[contractID].provider == msg.sender &&
            keccak256(chunk) == contracts[contractID].currentChunkHash
        );

        contracts[contractID].challenging = false;

        emit Proved(contractID);
    }

    function slashProvider(uint contractID) external {
        require( 
            contracts[contractID].challenging && 
            block.timestamp - 86400 >= contracts[contractID].challengeTimeout &&
            msg.sender == contracts[contractID].user
        );

        contracts[contractID].slashed = true;

        emit ProviderSlashed(contractID);
    }


    function closeContract(uint contractID) external {
        require(
            contracts[contractID].user == msg.sender &&
            !contracts[contractID].ended &&
            contracts[contractID].started
        );
        
        contracts[contractID].ended = true;

        emit ContractClosed(contractID);
    }

    function withdrawBond(uint contractID) external {
        require(
            contracts[contractID].provider == msg.sender &&
            contracts[contractID].started &&
            !contracts[contractID].slashed &&
            (block.timestamp >= contracts[contractID].timeout || contracts[contractID].ended)
        );

        payable(address(msg.sender)).transfer(storageBond);

        emit BondWithdrawed(contractID);
    }
}
