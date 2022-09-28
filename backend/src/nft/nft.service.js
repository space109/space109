const NftRepository = require("./nft.repository");
const nftRepository = new NftRepository();

class NftService {
  async displayMyNft(toeknId, scale, position,positionXYZ, galleryId, oa,metadata) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.displayMyNft(
          toeknId,
          scale,
          position,
          positionXYZ,
          galleryId,
          oa,
          metadata
        ),
      },
    };
  }
  async updateDisplayInfo(nftId, scale, position, positionXYZ) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.updateDisplayInfo(nftId, scale, position, positionXYZ),
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

  async deleteNft(nftId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.deleteNft(nftId),
      },
    };
  }
}
module.exports = NftService;
