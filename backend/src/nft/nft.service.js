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
}
module.exports = NftService;
