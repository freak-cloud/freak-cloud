## JSON-RPC APIs

This document is a specification for Freak Cloud's JSON-RPC APIs.


## Request body

Every method will have the same request body like this:

```
{
    "method": "Method to call",
    "params": {}
}
```


## Methods' params

* `createContract`:
    * params:
        * `filePath`: `Path to file in your computer.` (string).
        * `storageFee`: `Fee you want to pay.` (string/number).
        * `timeout`: `Period of time for the data to be stored` (number).
    * respond:
        * `merkleTopNode`: `Top node from a merkle tree with its leaves` (`Node`: `{ val: hash | String, left: leftNode | Node, right: rightNode | Node }`).
        * `ipfsHash`: `CID of file in IPFS` (string).
        * `id`: `A BigNumber object` (`{ type: "BigNumber", value: "The value in hex" }`).

All of the ones below will respond with a `null` payload.

* `download`:
    * `contractID`: `Contract ID.` (number).
    * `ipfsHash`: `IPFS hash of file.` (string).
    * `dir`: `Directory to store file in.` (string).
    * `fee`: `Download fee.` (string/number).
    

* `challenge`:
    * `contractID`: `Contract ID.` (number).
    * `leaves`: `An array of leave hashes to the merkle root` (array).

* `removeContract`:
    * `contractID`: `Contract ID.` (number).

* `closeContract`:
    * `contractID`: `Contract ID.` (number).
