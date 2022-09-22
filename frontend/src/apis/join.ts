import axios from 'axios';

const join = async (walletAddress: any, nickname: any) => {
  try {
    const { data: { result, data } } : any = await axios({
      method: 'POST',
      url: "http://j7b109.p.ssafy.io:8080/wallet/join", // 주소? 
      data: {
        "oa": walletAddress,
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

export default join;
