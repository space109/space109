import axios from 'axios';

const getMetadata = async (url: any) => {
  console.log(url)
  try {
    const data : any = await axios({
      method: 'GET',
      url: url, 
    });
    console.log(data);
    return;
  } catch (error) {
    console.error(error);
  }
};

export default getMetadata;
