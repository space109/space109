import axios from 'axios';
import apiPath from '../common/apiPath';

const login = async (walletAddress: any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'POST',
      url: apiPath.wallet.login(), 
      data: {
        "oa": walletAddress,
      }
    });
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
