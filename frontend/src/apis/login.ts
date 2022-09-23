import axios from 'axios';
import apiPath from '../common/apiPath';

const login = async (walletAddress: any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'POST',
      url: apiPath.wallet.login(), // 주소? 
      data: {
        "oa": walletAddress,
      }
    });
    console.log(result, data);
    if (result === 'success') {
      return data;
    } else {
      alert("통신에러")
    }
  } catch (error) {
    console.error(error);
  }
};

export default login;
