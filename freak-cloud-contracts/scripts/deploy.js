const hre = require("hardhat");

async function main() {
    // Deploy Token contract
    const Settlement = await hre.ethers.getContractFactory("Settlement");
    const settlement = await Settlement.deploy();

    await settlement.deployed();

    console.log("Settlement deployed to:", settlement.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
