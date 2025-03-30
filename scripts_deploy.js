const hre = require("hardhat");

async function main() {
  const ProductVerifier = await hre.ethers.getContractFactory("ProductVerifier");
  const contract = await ProductVerifier.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});