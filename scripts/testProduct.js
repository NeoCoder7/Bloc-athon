const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const contract = await hre.ethers.getContractAt("ProductVerifier", contractAddress, owner);

  console.log("Registering product...");
  const tx = await contract.registerProduct(
    "A1B2C3D4",
    "Nike",
    "Dunk Low",
    "Spring2025",
    "ipfs://QmFakeHash123456789"
  );
  await tx.wait();

  console.log("✅ Product registered!");

  const isValid = await contract.verifyProduct("A1B2C3D4");
  console.log("✅ Product exists?", isValid);

  const details = await contract.getProductDetails("A1B2C3D4");
  console.log("📦 Details:", details);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});