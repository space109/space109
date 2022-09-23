 const NftCreator = artifacts.require("mint_Test");

 contract("NftCreator", (accounts) => {
     
     it("NFT mint, transfer, and compare URI", async () => {
      const account_one = accounts[0];
      // // const account_two = accounts[1];

      const instance = await NftCreator.deployed();
      const meta = instance;
      await meta.create(account_one, "tokenURI123", { from: account_one });

      let tokenId = await meta.current();

      // await meta.create(account_one, "tokenURI1234", { from: account_one });
      // let tokenId2 = await meta.current();
      // const realTokenId = tokenId.toNumber()
      // const realTokenId2 = tokenId2.toNumber()
      const firstOwner = await meta.ownerOf(realTokenId);
      // await meta.transferFrom(account_one, account_two, realTokenId, { from: account_one });
      // const secondOwner = await meta.ownerOf(realTokenId);
      // const afterTokenURI = await meta.tokenURI(realTokenId) 

      assert.equal(account_one, firstOwner, "NFT Mint Failed");

      // assert.equal(account_two, secondOwner, "NFT Transfer Failed.");
      // assert.equal("tokenURI123", afterTokenURI, "Wrong Token Id or URI.")
     });
 
 });