import axios from "axios";

const PINATA_API_KEY = "a0794dc2a7c29b0e01f9";
const PINATA_SECRET = "e88d9be5be757490fca79bb2c619fb0828fa2b0037708da9d44184f487522f96";

export const uploadToIPFS = async (file) => {

  const formData = new FormData();
  formData.append("file", file);

  try {

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET,
        },
      }
    );

    return res.data.IpfsHash;

  } catch (error) {

    console.error("IPFS Upload Error:", error);

  }
};



// ad54a907d29e247b28cd1fe2f12a6c68f756d4839c11c436886b6c2e6778f755



// 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80