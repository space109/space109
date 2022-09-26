import axios from "axios";
import apiPath from "../common/apiPath";

const myGalleryInfoUpdate = async (datas: any) => {
  console.log(datas);
  try {
    const {
      data: { result, data },
    }: any = await axios({
      method: "PUT",
      url: apiPath.gallery.myGalleryInfo(),
      data: datas,
    });
    if (result === "success") {
      return data;
    } else {
      alert("통신에러");
    }
  } catch (error) {
    console.error(error);
  }
};

export default myGalleryInfoUpdate;
