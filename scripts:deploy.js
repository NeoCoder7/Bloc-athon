const hre = require("hardhat");

async function main() {
  const ProductVerifier = await hre.ethers.getContractFactory("ProductVerifier");
  const contract = await ProductVerifier.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});