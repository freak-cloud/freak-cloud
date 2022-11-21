import { getDepth, buildMerkleTree, getChunks } from "../utils/merkle.js";
import { fcContract, jsonRPCProvider } from "../contract/instances.js";
import { Level } from "level";
import * as all from "it-all";
import { config } from "../../config.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as IPFS from "ipfs-core";

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new Level(__dirname + "/../log/db", { valueEncoding: "json" });

export async function startHost() {
    const ipfs = await IPFS.create();

    fcContract.on("ContractCreated", async (contractID, user, dataRoot, treeDepth, storageFee, ipfsHash, timeout) => {
        if (config.PREFERRED_FEE && config.PREFERRED_FEE > storageFee) return;

        const currentBlock = await jsonRPCProvider.getBlockNumber();
        const blockTimestamp = (await jsonRPCProvider.getBlock(currentBlock)).timestamp;
        
        if (config.MAX_TIMEOUT && config.MAX_TIMEOUT + blockTimestamp < timeout) return;
    
        let fileMetadata, merkleTopNode, _treeDepth;
        
        try {
            fileMetadata = Buffer.concat(await all(ipfs.cat(ipfsHash))).toString();
            merkleTopNode = buildMerkleTree(fileMetadata);
            _treeDepth = getDepth(merkleTopNode);
    
            if (merkleTopNode.val !== dataRoot || _treeDepth !== treeDepth) return;
        } catch (e) {
            console.log(e);

            return;
        }
    
        await ipfs.add(fileMetadata);
    
        db.put(contractID, getChunks(fileMetadata));
    
        try {
            await fcContract.takeContract(contractID);
        } catch (e) {
            console.log(e);

            return;
        }

        console.log("New contract taken!");
    });
    
    fcContract.on("Challenged", async (contractID, chunkHash) => {
        const takenContracts = await db.keys().all();
    
        if (takenContracts.includes(contractID)) {
            const chunk = (await db.get(contractID))[chunkHash];
    
            await fcContract.prove(contractID, chunk);
        }

        console.log("Successfully resolved a challenge request.");
    });

    console.log("Started listening.")
}
