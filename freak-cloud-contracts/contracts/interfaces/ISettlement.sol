// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ISettlement {
    struct Contract {
        address user;
        address provider;
        
        uint treeDepth;
        bytes32 dataRoot;
        bytes32 currentChunkHash;
        string ipfsHash;
        
        uint storageFee;
        uint downloadFee;
        
        bool started;
        bool ended;
        bool challenging;
        bool slashed;

        uint timeout;
        uint challengeTimeout;
    }


    event ContractCreated(
        uint contractID, 
        address user, 
        bytes32 dataRoot, 
        uint treeDepth, 
        uint storageFee, 
        string ipfsHash,
        uint timeout
    );
    
    event ContractTaken(uint contractID);

    event ContractRemoved(uint contractID);
    
    event DownloadFeeInited(uint contractID, uint fee);
    
    event DownloadFeePaid(uint contractID);
    
    event Challenged(uint contractID, bytes32 chunkHash);
    
    event Proved(uint contractID);

    event ProviderSlashed(uint contractID);

    event ContractClosed(uint contractID);

    event BondWithdrawed(uint contractID);


    function createContract(bytes32 root, uint treeDepth, string calldata ipfsHash, uint timeout) external payable;

    function takeContract(uint contractID) external payable;

    function removeContract(uint contractID) external;

    function initDownloadFee(uint contractID) external payable;

    function payDownloadFee(uint contractID) external;

    function challenge(uint contractID, bytes32[] calldata leaves) external;

    function prove(uint contractID, bytes calldata chunk) external;

    function slashProvider(uint contractID) external;

    function closeContract(uint contractID) external;

    function withdrawBond(uint contractID) external;
}
