import * as ethers from "ethers";
const encoder = new TextEncoder();

function Node(val, left = null, right = null) {
    return { val, left, right };
}

export function getDepth(node, depth = 1) {
    if (node.left === null) {
        return depth;
    }

    return getDepth(node, depth + 1);
}

export function getMerklePath(node, target, path = []) {
    if (node.val === target) return path;
    if (node.left === null) return [];

    const path1 = getMerklePath(node.left, target, [...path, node.right.val]);
    const path2 = getMerklePath(node.right, target, [...path, node.left.val]);

    if (path1.length !== 0) return path1;
    if (path2.length !== 0) return path2;

    return [];
}

export function getChunks(data = "") {
    data = encoder.encode(data);

    const chunks = {};
    const currentChunk = [];

    for (let ind = 0; ind < data.length; ind++) {
        currentChunk.push(data[ind]);

        if ((ind + 1) % 32 === 0 || ind === data.length-1) {
            const chunkHash = hashList.push(Node(ethers.utils.solidityKeccak256(["bytes"], [currentChunk])));
            
            chunks[chunkHash] = currentChunk;
            
            currentChunk.splice(0, currentChunk.length);
        }
    }

    return chunks;
}

export function buildMerkleTree(data = "") {
    data = encoder.encode(data);

    let hashList = [];

    const currentChunk = [];

    for (let ind = 0; ind < data.length; ind++) {
        currentChunk.push(data[ind]);

        if ((ind + 1) % 32 === 0 || ind === data.length-1) {
            hashList.push(Node(ethers.utils.solidityKeccak256(["bytes"], [currentChunk])));
            currentChunk.splice(0, currentChunk.length);
        }
    }
    
    if (hashList.length % 2 !== 0 && hashList.length !== 1) {
        hashList.push(hashList[hashList.length-1]);
    }

    while (hashList.length !== 1) {
        const newRow = [];

        while (hashList.length !== 0) {
            if (hashList.length % 2 !== 0 && hashList.length !== 1) {
                hashList.push(hashList[hashList.length-1]);
            }
    
            const left = hashList.shift();
            const right = hashList.shift();
    
            const node = Node(ethers.utils.solidityKeccak256(["bytes", "bytes"], [left.val, right.val]), left, right);
    
            newRow.push(node);
        }

        hashList = newRow;
    }
    
    return hashList[0];
}
