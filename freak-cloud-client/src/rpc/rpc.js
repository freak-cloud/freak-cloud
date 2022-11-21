// Bad RPC server implementation, will be updated soon.

"use strict";

import Fastify from "fastify";
import * as IPFS from "ipfs-core";
import { readFileSync, writeFileSync } from "node:fs";
import { getDepth, getMerklePath, buildMerkleTree } from "../utils/merkle.js";
import { fcContract } from "../contract/instances.js";

const fastify = Fastify();

export async function rpc(PORT) {
    const ipfs = await IPFS.create();

    process.on("uncaughtException", err => console.log("LOG ::", err));

    fastify.post("/", async (req, reply) => {

        function throwError(message, status, payload = null) {
            reply.status(status);

            reply.send({
                success: false,
                payload: null,
                error: { message }
            });
        }

        function respond(payload) {
            reply.send({
                success: true,
                payload
            })
        }

        if (typeof req.body.params !== "object") return;
        if (typeof req.body.method !== "string") return;

        switch (req.body.method) {
            case "createContract":
                let id, fileMetadata, ipfsHash, { filePath, storageFee, timeout } = req.body.params;

                if (typeof timeout === "undefined") { timeout = 2592000; } // Default expiration period 

                try {
                    fileMetadata = JSON.stringify({
                        name: filePath.split("/").pop(),
                        data: readFileSync(filePath)
                    });
                } catch (e) {
                    throwError("File not found.", 400);
                    
                    return;
                }

                try {
                    ipfsHash = await ipfs.add(fileMetadata);
                } catch (e) {
                    throwError("An error occured while uploading data to IPFS.", 400);
                    
                    return;
                }

                const merkleTopNode = buildMerkleTree(fileMetadata);
                const treeDepth = getDepth(merkleTopNode);

                try {
                    const tx = await fcContract.createContract(
                        merkleTopNode.val, 
                        treeDepth, 
                        ipfsHash, 
                        timeout,
                        { value: BigInt(storageFee) }
                    );

                    const rc = await tx.wait(); 
                    const event = rc.events.find(event => event.event === 'ContractCreated');

                    console.log(event.args[0]);
                    
                    id = event.args[0];
                } catch (e) {
                    throwError("An error occured while creating contract.", 400);
                    
                    return;
                }

                respond({ merkleTopNode, ipfsHash, id });

                break;

            case "download":
                const { contractID, dir, fee } = req.body.params;

                const _ipfsHash = req.body.params.ipfsHash;

                try {
                    await fcContract.initDownloadFee(contractID, { value: BigInt(fee) });
                } catch (e) {
                    console.log(e);

                    throwError("An error occured while setting download fee.", 400);
                    
                    return;
                }

                try {
                    const fileMetadata = JSON.parse(Buffer.concat(await all(ipfs.cat(_ipfsHash))).toString());

                    const path = dir[dir.length-1] === "/" ? dir : dir + "/";

                    writeFileSync(path + fileMetadata.name, fileMetadata.data);
                } catch (e) {
                    throwError("An error occured while downloading.", 400);
                    
                    return;
                }

                try {
                    await fcContract.payDownloadFee(contractID);
                } catch (e) {
                    throwError("File downloaded but an error occured while paying fee.", 400);
                    
                    return;
                }

                respond(null);

                break;

            case "challenge":
                try {
                    await fcContract.challenge(req.body.params.contractID, req.body.params.leaves);
                } catch (e) {
                    throwError("An error occured while making a challenge.", 400);
                    
                    return;
                }

                respond(null);
                
                break;

            case "removeContract":
                try {
                    await fcContract.removeContract(req.body.params.contractID);
                } catch (e) {
                    throwError("An error occured while removing contract.", 400);
                    
                    return;
                }

                respond(null);

                break;
            
            case "closeContract":
                try {
                    await fcContract.closeContract(req.body.params.contractID);
                } catch (e) {
                    throwError("An error occured while closing contract.", 400);
                    
                    return;
                }

                respond(null);

                break;

            default:
                throwError("Invalid method.", 404);
        }
    });

    fastify.listen(PORT, (err, address) => {
        if (err) {
            console.log("LOG :: Error at RPC server: Fastify: ", err);
            process.exit(1);
        }

        console.log(`LOG :: RPC server running on PORT ${PORT}`);
    });
}
