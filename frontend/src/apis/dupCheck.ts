import axios from 'axios';

const dupCheck = async (nickname: any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'GET',
      url: "http://j7b109.p.ssafy.io:3030/wallet/check", // 주소? 
      data: {
        "nickname": nickname,
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
