import axios from "axios";
import apiPath from "../common/apiPath";

const myGalleryInfo = async (oa: string) => {
  try {
    const {
      data: { result, data },
    }: any = await axios({
      method: "GET",
      url: apiPath.gallery.myGalleryInfo(),
      params: {
        oa,
      },
    });
    if (result === "success") {
      console.log("이거 보고 싶어", data)
      return data;
    } else {
      alert("통신에러");
    }
  } catch (error) {
    console.error(error);
  }
};

export default myGalleryInfo;
