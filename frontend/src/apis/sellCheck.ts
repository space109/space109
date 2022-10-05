import axios from 'axios';
import apiPath from '../common/apiPath';

const sellCheck = async (galleryId:any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'GET',
      url: apiPath.wallet.sellCheck(), 
      params: {
        "galleryId": galleryId,
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

export default sellCheck;
