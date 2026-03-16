const hre = require("hardhat");

async function main() {

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  const PatentRegistry = await hre.ethers.getContractFactory("PatentRegistry");
  const patentRegistry = await PatentRegistry.attach(contractAddress);

  const patent = await patentRegistry.getPatent(1);

  console.log("Patent Details:");
  console.log("ID:", patent.id.toString());
  console.log("Inventor:", patent.inventor);
  console.log("Title:", patent.title);
  console.log("IPFS Hash:", patent.ipfsHash);
  console.log("Timestamp:", patent.timestamp.toString());
  console.log("Owner:", patent.owner);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});