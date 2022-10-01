const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Test", (accounts) => {
  const mintAmount = 10000;
  const uri = "testURI";
  const admin = accounts[0];
  const seller = accounts[1];
  const buyer = accounts[2];
  console.log("admin: " + admin);
  console.log("seller: " + seller);
  console.log("buyer: " + buyer);

  // 내 지갑주소 기반으로 내가 현재 소유중인 NFT목록 가져오기
  it("Get a list of NFTs I currently own based on my wallet address", async () => {
    console.log(
      "1. Get a list of NFTs I currently own based on my wallet address"
    );
    // 배포 후 그 주소 저장
    const ssafyTokenContract = await SsafyToken.deployed();
    const ssafyNFTContract = await SsafyNFT.deployed();
    const saleFactoryContract = await SaleFactory.deployed();
    // NFT 생성
    const uri1 = "testURI1";
    const uri2 = "testURI2";
    const uri3 = "testURI3";
    const uri4 = "testURI4";
    await ssafyNFTContract.create(seller, uri1, { from: seller });
    await ssafyNFTContract.create(seller, uri2, { from: seller });
    await ssafyNFTContract.create(buyer, uri3, { from: buyer });
    await ssafyNFTContract.create(buyer, uri4, { from: buyer });

    //   내 지갑주소 기반으로 내가 현재 소유중인 NFT목록 가져오기
    //   let sellerNftList = await ssafyNFTContract.getMyNftLIst({ from: seller });
    // console.log(sellerNftList);
    let sellerTokenURIsofWallet = await ssafyNFTContract.tokenIDsoftWallet(
      seller,
      {
        from: seller,
      }
    );
    let buyerTokenURIsofWallet = await ssafyNFTContract.tokenIDsoftWallet(
      buyer,
      {
        from: buyer,
      }
    );
    console.log(
      "every tokenURIs cnt = " + (await ssafyNFTContract.totalSupply())
    );
    console.log(
      "sellers tokenURIsofWallet : " + JSON.stringify(sellerTokenURIsofWallet)
    );
    console.log(
      "buyers tokenURIsofWallet : " + JSON.stringify(buyerTokenURIsofWallet)
    );
    console.log(
      "----------------------------------------------------------------"
    );
  });

  // 내 지갑주소 기반으로 내가 판매중인 NFT목록 가져오기
  it("ABI to pull out NFTs on sale", async () => {
    console.log("2. ABI to pull out NFTs on sale");
    //   판매중인 NFT들을 뽑아주는 ABI

    // 배포 후 그 주소 저장
    const ssafyTokenContract = await SsafyToken.deployed();
    const ssafyNFTContract = await SsafyNFT.deployed();
    const saleFactoryContract = await SaleFactory.deployed();
    // NFT 생성
    // const uri1 = "testURI1";
    // const uri2 = "testURI2";
    // const uri3 = "testURI3";
    // const uri4 = "testURI4";
    // await ssafyNFTContract.create(seller, uri1, { from: seller });
    // await ssafyNFTContract.create(seller, uri2, { from: seller });
    // await ssafyNFTContract.create(buyer, uri3, { from: buyer });
    // await ssafyNFTContract.create(buyer, uri4, { from: buyer });
    let sellerTokenURIsofWallet = await ssafyNFTContract.tokenIDsoftWallet(
      seller,
      {
        from: seller,
      }
    );
    let buyerTokenURIsofWallet = await ssafyNFTContract.tokenIDsoftWallet(
      buyer,
      {
        from: buyer,
      }
    );
    console.log(
      "every tokenURIs cnt = " + (await ssafyNFTContract.totalSupply())
    );
    console.log(
      "sellers tokenURIsofWallet : " + JSON.stringify(sellerTokenURIsofWallet)
    );
    console.log(
      "buyers tokenURIsofWallet : " + JSON.stringify(buyerTokenURIsofWallet)
    );

    // 판매 생성
    const price = 100;
    console.log("create seller's NFT sales order");
    await saleFactoryContract.createSale(
      parseInt(sellerTokenURIsofWallet[0]),
      price,
      ssafyTokenContract.address,
      ssafyNFTContract.address,
      { from: seller }
    );
    console.log("create buyer's NFT sales order");
    await saleFactoryContract.createSale(
      parseInt(buyerTokenURIsofWallet[0]),
      price,
      ssafyTokenContract.address,
      ssafyNFTContract.address,
      { from: buyer }
    );

    // 전체 판매 조회
    let allSales = await saleFactoryContract.allSales();
    console.log("allSales = " + allSales);
    let allSalesNFTs = await saleFactoryContract.allSalesNfts();
    console.log("allSalesNFTs = " + allSalesNFTs);
    let sellerSalesList = await saleFactoryContract.getMySaleNftList({
      from: seller,
    });
    console.log("sellerSalesList = " + JSON.stringify(sellerSalesList));
    console.log(
      "----------------------------------------------------------------"
    );
  });

  // 토큰 아이디 기반으로 NFT의 판매 정보(판매가격 + purchase함수 불러올 수 있는 ca값) 가져오기(판매 중이지 않으면 null값이 온다.)
  it("Get NFT's sales information (sales price + ca value that can recall the purchase function) based on token ID", async () => {
    console.log(
      "3.Get NFT's sales information (sales price + ca value that can recall the purchase function) based on token ID"
    );
    // 토큰 아이디 기반으로 NFT의 판매 정보(판매가격 + purchase함수 불러올 수 있는 ca값) 가져오기(판매 중이지 않으면 null값이 온다.)
    const ssafyTokenContract = await SsafyToken.deployed();
    const ssafyNFTContract = await SsafyNFT.deployed();
    const saleFactoryContract = await SaleFactory.deployed();
    // seller가 판매중인 NFT들의 목록을 가지고옴
    let sellerSalesList = await saleFactoryContract.getMySaleNftList({
      from: seller,
    });
    console.log("sellerSalesList = " + sellerSalesList);
    let sellerNftId = sellerSalesList[0];
    let saleData = await saleFactoryContract.getSaleData(sellerNftId);
    console.log("saleData = " + JSON.stringify(saleData));
  });
  // 판매자가 본인이 올린 NFT를 구매하기 요청을 했을 때, 솔리디티 상에서도 한번 막아서 오류를 내주는 로직이 있었으면 좋겠음
  it("Block own purchase request", async () => {
    console.log("4.Block own purchase request");
    // 토큰 아이디 기반으로 NFT의 판매 정보(판매가격 + purchase함수 불러올 수 있는 ca값) 가져오기(판매 중이지 않으면 null값이 온다.)
    const ssafyTokenContract = await SsafyToken.deployed();
    const ssafyNFTContract = await SsafyNFT.deployed();
    const saleFactoryContract = await SaleFactory.deployed();
    let allSales = await saleFactoryContract.allSales();

    // Sale컨트랙트에게 seller의 NFT 관리 권한을 부여한다.
    ssafyNFTContract.setApprovalForAll(allSales[0], true, {
      from: seller,
    });
    // Sale컨트랙트에게 seller의 NFT 관리 권한을 부여한다.
    ssafyNFTContract.setApprovalForAll(allSales[1], true, {
      from: buyer,
    });
    let salesContract = await Sale.at(allSales[0]);
    // 자기물건 자기가 구매
    await ssafyTokenContract.approve(allSales[0], 1000, { from: seller });
    await salesContract.purchase({ from: seller });
    currentSellerBalance = await ssafyTokenContract.balanceOf(seller);
    console.log("currentSellerBalance = " + currentSellerBalance);
  });
});
