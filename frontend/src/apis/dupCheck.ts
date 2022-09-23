import axios from 'axios';
import apiPath from '../common/apiPath';

const dupCheck = async (nickname: any) => {
  console.log(nickname)
  console.log(apiPath.wallet.dupCheck())
  try {
    const { data: { result, data } } : any = await axios({
      method: 'GET',
      url: apiPath.wallet.dupCheck(), 
      params: {
        nickname,
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

export default dupCheck;
