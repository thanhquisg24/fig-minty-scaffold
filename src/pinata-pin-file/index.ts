import FormData from "form-data";
import axios from "axios";

const JWT = process.env.REACT_APP_PINATA_JWT || "";

export interface IPinataResult {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const pinFileToIPFS = async (imgFile: File, imageName: string): Promise<IPinataResult> => {
  const formData = new FormData();
  // const src = "./Donkey-milk-on-the-agenda-for-Italian-parliament.jpg";

  // const file = fs.createReadStream(src);
  formData.append("file", imgFile);

  const metadata = JSON.stringify({
    name: imageName,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: JWT,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

interface IMetaDataJson {
  name: string;
  image: string;
  description: string;
}

export const pinJsonMetadata = async (data: IMetaDataJson): Promise<IPinataResult> => {
  const _metadata = {
    description: data.description,
    image: data.image.indexOf("ipfs://") > -1 ? data.image : `ipfs://${data.image}`,
    name: data.name,
  };

  const postData = JSON.stringify({
    pinataOptions: {
      cidVersion: 0,
    },
    pinataMetadata: {
      name: `${data.name}.json`,
    },
    pinataContent: {
      ..._metadata,
    },
  });
  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// async function main() {
//   const _metadata: IMetaDataJson = {
//     description: "Donkey from Taiwain",
//     image: "",
//     name: "Black Donkey",
//   };
//   const resultImg = await pinFileToIPFS();
//   if (resultImg) {
//     _metadata.image = "ipfs://" + resultImg.IpfsHash;
//     const resultMetadata = await pinJsonMetadata(_metadata);
//     console.log("🚀 ~ file: index.ts:86 ~ main ~ resultMetadata", resultMetadata);
//   }
// }
// main().then();
// pinFileToIPFS().then();
