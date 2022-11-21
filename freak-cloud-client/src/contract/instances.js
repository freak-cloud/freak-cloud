import { ethers } from "ethers";
import { config } from "../../config.js";
import * as contractConfig from "./config.js";

const jsonRPCProvider = new ethers.providers.JsonRpcProvider(config.JSON_RPC);

const signer = new ethers.Wallet(config.PRIVATE_KEY, jsonRPCProvider);

export const fcContract = new ethers.Contract(contractConfig.config.address, contractConfig.config.abi, signer);
