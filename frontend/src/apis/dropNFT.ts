import axios from 'axios';
import apiPath from '../common/apiPath';

const dropNFT = async (tokenId:any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'DELETE',
      url: apiPath.nft.drop(), 
      params: {
        "tokenId": tokenId,
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

export default dropNFT;
