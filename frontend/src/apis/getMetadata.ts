import axios from 'axios';

const getMetadata = async (url: any) => {
  try {
    const { data } : any = await axios({
      method: 'GET',
      url: url, 
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getMetadata;
