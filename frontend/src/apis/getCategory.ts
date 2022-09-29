import axios from 'axios';
import apiPath from '../common/apiPath';

const getCategory = async () => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'GET',
      url: apiPath.gallery.category(), 
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

export default getCategory;
