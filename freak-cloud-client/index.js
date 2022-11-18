import { config } from "./config.js";
import { rpc } from "./src/rpc/rpc.js";

rpc(config.RPC_PORT);
