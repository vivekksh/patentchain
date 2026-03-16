const hre = require("hardhat");

async function main() {

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  const PatentRegistry = await hre.ethers.getContractFactory("PatentRegistry");
  const patentRegistry = await PatentRegistry.attach(contractAddress);

  const tx = await patentRegistry.registerPatent(
    "AI Powered Patent System",
    "QmExampleIPFSHash123"
  );

  await tx.wait();

  console.log("Patent registered successfully!");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});