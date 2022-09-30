/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {
    let instance = await NftCreator.deployed();
    let owner = accounts[0];

    // NFT 생성
    let tokenId = await instance.create(
      owner,
      "https://ipfs.io/ipfs/QmXU9V6UJdZjvV7W8k6n1V7Q2hjvJG8jHnXfXr7rXoJdU7"
    );
    console.log("tokenId = " + JSON.stringify(tokenId.logs[0].args.tokenId));
    let tokenURI = await instance.tokenURI(tokenId.logs[0].args.tokenId);
    let ownerOf = await instance.ownerOf(tokenId.logs[0].args.tokenId);

    // NFT 소유권 이전
    await instance.transferFrom(
      owner,
      accounts[1],
      tokenId.logs[0].args.tokenId
    );
    let newOwner = await instance.ownerOf(tokenId.logs[0].args.tokenId);

    // NFT 소유권 확인
    assert.equal(
      tokenURI,
      "https://ipfs.io/ipfs/QmXU9V6UJdZjvV7W8k6n1V7Q2hjvJG8jHnXfXr7rXoJdU7",
      "TokenURI is not matched"
    );
    assert.equal(ownerOf, owner, "Owner is not matched");
    assert.equal(newOwner, accounts[1], "New owner is not matched");

    // assert.equal(sender, owner, "NFT Mint Failed");
    // assert.equal(receiver, owner, "NFT Transfer Failed.");
    // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
  });
});
