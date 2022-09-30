const NftRepository = require("./nft.repository");
const nftRepository = new NftRepository();

class NftService {
  async displayMyNft(
    tokenId,
    scale,
    position,
    positionXYZ,
    galleryId,
    oa,
    metadata
  ) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.displayMyNft(
          tokenId,
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
  async updateDisplayInfo(nftId, scale, position, positionXYZ, metadata) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.updateDisplayInfo(
          nftId,
          scale,
          position,
          positionXYZ,
          metadata
        ),
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
