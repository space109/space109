const HOST = process.env.REACT_APP_BACKEND_HOST;

const WALLET = "wallet/";
const GALLERY = "gallery/";
const NFT = "nft/";

const apiPath = {
  wallet: {
    login: () => HOST + WALLET,
    join: () => HOST + WALLET + "join/",
    dupCheck: () => HOST + WALLET + "check/",
  },
  gallery: {},
  nft: {},
};

export default apiPath;
