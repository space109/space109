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
    metadata,
    rotation
  ) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        nftId: await nftRepository.displayMyNft(
          tokenId,
          scale,
          position,
          positionXYZ,
          galleryId,
          oa,
          metadata,
          rotation
        ),
      },
    };
  }
  async updateDisplayInfo(
    nftId,
    scale,
    position,
    positionXYZ,
    metadata,
    rotation
  ) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.updateDisplayInfo(
          nftId,
          scale,
          position,
          positionXYZ,
          metadata,
          rotation
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

  async sellNft(nftId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.sellNft(nftId),
      },
    };
  }

  async deleteFrame(nftId) {
    return {
      statusCode: 200,
      responseBody: {
        result: "success",
        data: await nftRepository.deleteFrame(nftId),
      },
    };
  }
}
module.exports = NftService;
