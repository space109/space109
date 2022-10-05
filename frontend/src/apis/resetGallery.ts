import axios from "axios";
import apiPath from "../common/apiPath";

const resetGallery = async (oa: string) => {
  console.log("??")
  try {
    const {
      data: { result, data },
    }: any = await axios({
      method: "DELETE",
      url: apiPath.gallery.myGalleryInfo(),
      params: {
        oa,
      },
    });
    if (result === "success") {
      console.log(data);
      return data;
    } else {
      alert("통신에러");
    }
  } catch (error) {
    console.error(error);
  }
};

export default resetGallery;
