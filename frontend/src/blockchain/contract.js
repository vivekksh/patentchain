import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractABI = [
    "function registerPatent(string memory _title, string memory _ipfsHash) public",
    "function getPatent(uint256 _patentId) public view returns (uint256,address,string,string,uint256,address)",
    "function transferOwnership(uint256 _patentId, address _newOwner)"
  ];

export const getContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return contract;
};