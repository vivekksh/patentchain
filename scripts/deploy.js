const hre = require("hardhat");

async function main() {

  const PatentRegistry = await hre.ethers.getContractFactory("PatentRegistry");

  const patentRegistry = await PatentRegistry.deploy();

  await patentRegistry.deployed();

  console.log("PatentRegistry deployed to:", patentRegistry.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});