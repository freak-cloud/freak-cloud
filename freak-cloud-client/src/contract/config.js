export const config = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "BondWithdrawed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "Challenged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "ContractClosed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "dataRoot",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "treeDepth",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "storageFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timeout",
          "type": "uint256"
        }
      ],
      "name": "ContractCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "ContractRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "ContractTaken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "DownloadFeeInited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "DownloadFeePaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "Proved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "ProviderSlashed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "leaves",
          "type": "bytes32[]"
        }
      ],
      "name": "challenge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "closeContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "contracts",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "treeDepth",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "dataRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "currentChunkHash",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "storageFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "downloadFee",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "started",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "ended",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "challenging",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "slashed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timeout",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "challengeTimeout",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "treeDepth",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timeout",
          "type": "uint256"
        }
      ],
      "name": "createContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentContractID",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "initDownloadFee",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "payDownloadFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "chunk",
          "type": "bytes"
        }
      ],
      "name": "prove",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "removeContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "slashProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "takeContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contractID",
          "type": "uint256"
        }
      ],
      "name": "withdrawBond",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

