import axios from 'axios';

const login = async (walletAddress) => {
  try {
    const { result, data } = await axios({
      method: 'POST',
      url: "/wallet", // 주소? 
      data: {
        "oa": walletAddress,
      }
    });
    console.log(result, data);
    // return data;
  } catch (error) {
    console.error(error);
  }
};

export default login;
