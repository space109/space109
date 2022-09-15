const NftRepository = require("./nft.repository");
const nftRepository = new NftRepository();

class NftService {
  async sellMyNft(toeknId, scale, position, galleryId, oa) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.sellMyNft(
          toeknId,
          scale,
          position,
          galleryId,
          oa
        ),
      },
    };
  }
  async updateDisplayInfo(nftId, scale, position) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.updateDisplayInfo(nftId, scale, position),
      },
    };
  }

  async getDisplayedNftList(galleryId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.getDisplayedNftList(galleryId),
      },
    };
  }

  async deleteSoldNft(nftId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.deleteSoldNft(nftId),
      },
    };
  }
}
module.exports = NftService;
