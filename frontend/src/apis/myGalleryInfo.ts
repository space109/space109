import axios from "axios";
import apiPath from "../common/apiPath";

const myGalleryInfo = async (oa: string) => {
  console.log("111", apiPath.gallery.myGalleryInfo());
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
      return data;
    } else {
      alert("통신에러");
    }
  } catch (error) {
    console.error(error);
  }
};

export default myGalleryInfo;
