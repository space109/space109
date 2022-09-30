/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
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

  it("test to NFT minting, create Sale, delete Sale, buy NFT", async () => {
    const admin = accounts[0];
    const seller = accounts[1];
    const buyer = accounts[2];
    console.log("admin: " + admin);
    console.log("seller: " + seller);
    console.log("buyer: " + buyer);
    // 배포 후 그 주소 저장
    const ssafyTokenContract = await SsafyToken.deployed();
    const ssafyNFTContract = await SsafyNFT.deployed();
    const saleFactoryContract = await SaleFactory.deployed();

    // 토큰 주입
    await ssafyTokenContract.mint(10000, { from: admin });
    await ssafyTokenContract.forceToTransfer(admin, seller, 2000, {
      from: admin,
    });
    await ssafyTokenContract.forceToTransfer(admin, buyer, 1000, {
      from: admin,
    });
    // await ssafyTokenContract.increaseAllowance(seller, 500, { from: buyer });
    // await ssafyTokenContract.increaseAllowance(buyer, 500, {
    //   from: seller,
    // });
    const baseBuyerBalance = await ssafyTokenContract.balanceOf(buyer);
    const baseBuyerAllowance = await ssafyTokenContract.allowance(
      buyer,
      seller
    );
    const baseSellerBalance = await ssafyTokenContract.balanceOf(seller);
    const baseSellerAllowance = await ssafyTokenContract.allowance(
      seller,
      buyer
    );
    console.log(
      "--------------------------Set Buyer and Seller Balance---------------------------"
    );
    console.log("baseBuyerBalance = " + baseBuyerBalance);
    console.log("baseBuyerAllowance = " + baseBuyerAllowance);
    console.log("baseSellerBalance = " + baseSellerBalance);
    console.log("baseSellerAllowance = " + baseSellerAllowance);

    // NFT 생성
    const uri1 = "testURI1";
    const uri2 = "testURI2";
    await ssafyNFTContract.create(seller, uri1, { from: seller });
    await ssafyNFTContract.create(seller, uri2, { from: seller });
    console.log(
      "--------------------------mint Seller NFT---------------------------"
    );
    const baseSellerNftId = await ssafyNFTContract.tokenIDsoftWallet(seller, {
      from: seller,
    });
    const baseSellerNftBalance = await ssafyNFTContract.balanceOf(seller, {
      from: seller,
    });
    console.log("baseSellerNftId = " + baseSellerNftId);
    console.log("baseSellerNftBalance = " + baseSellerNftBalance);
    assert.notEqual(baseSellerNftId.length, 0, "seller fail to minting NFT");
    // 구매자 NFT 체크
    console.log(
      "--------------------------check buyer NFT---------------------------"
    );
    const baseBuyerNftId = await ssafyNFTContract.tokenIDsoftWallet(buyer, {
      from: buyer,
    });
    const baseBuyerNftBalance = await ssafyNFTContract.balanceOf(buyer, {
      from: buyer,
    });
    console.log("baseBuyerNftId = " + baseBuyerNftId);
    console.log("baseBuyerNftBalance = " + baseBuyerNftBalance);

    // seller 의 SaleFactory 에 NFT 이전 권한 부여
    // await ssafyNFTContract.setApprovalForAll(
    //   saleFactoryContract.address,
    //   true,
    //   { from: seller }
    // );

    // 판매 생성
    // console.log("ssafyTokenContract.address = " + ssafyTokenContract.address);
    // console.log("ssafyNFTContract.address = " + ssafyNFTContract.address);

    const price = 1000;
    // console.log("sellerNftIdType = " + typeof sellerNftId);
    // console.log("priceType = " + typeof price);
    // console.log("parseInt(sellerNftId) = " + parseInt(sellerNftId));

    console.log("create first NFT sales order");
    await saleFactoryContract.createSale(
      parseInt(baseSellerNftId[0]),
      price,
      ssafyTokenContract.address,
      ssafyNFTContract.address,
      { from: seller }
    );
    console.log("create second NFT sales order");
    await saleFactoryContract.createSale(
      parseInt(baseSellerNftId[1]),
      price,
      ssafyTokenContract.address,
      ssafyNFTContract.address,
      { from: seller }
    );

    // 판매 조회
    let allSales = await saleFactoryContract.allSales();
    console.log("allSales = " + allSales);
    assert.notEqual(allSales.length, 0, "seller fail to create Sale");

    // New Sale Contract 호출
    let currentSale = allSales[0];
    salesContract = await Sale.at(currentSale);

    // 삭제 테스트
    console.log(
      "--------------------------try to cancel first sale order--------------------------"
    );
    await salesContract.cancelSales({ from: seller });
    allSales = await saleFactoryContract.allSales();
    console.log("allSales = " + allSales);
    // 삭제 성공했는지 확인하는 코드
    assert.notEqual(allSales.length, 2, "fail to delete allSales[0]");

    // buyer가 구매
    currentSale = allSales[0];
    salesContract = await Sale.at(currentSale);
    // console.log("buyerAllowance = " + buyerAllowance);
    // 구매자가 꼭 해야하는 작업.
    // 구매자의송금제한금액을 판매자에게 보낼 토큰금액만큼 높여준다.
    await ssafyTokenContract.approve(currentSale, price, { from: buyer });
    // await ssafyNFTContract.approve(buyer, parseInt(sellerNftId), {
    //   from: seller,
    // });
    console.log(
      "--------------------------try to purchase--------------------------"
    );
    await salesContract.purchase({ from: buyer });
    console.log(
      "------------------------Buyer and Seller Balance----------------"
    );
    let currentBuyerBalance = await ssafyTokenContract.balanceOf(buyer);
    let currentSellerBalance = await ssafyTokenContract.balanceOf(seller);
    console.log("currentBuyerBalance = " + currentBuyerBalance);
    console.log("currentSellerBalance = " + currentSellerBalance);
    // assert.equal(currentBuyerNftBalance, 1, "buyer fail to purchase NFT");
    // assert.equal(currentSellerNftBalance, 0, "seller fail to receive payment");
    // 구매자의 송금제한금액을 다시 0으로 초기화
    await ssafyTokenContract.approve(currentSale, 0, { from: buyer });

    // 구매자와 판매자의 NFT 보유량 확인
    console.log(
      "------------------------Buyer and Seller NFT Balance----------------"
    );
    let currentBuyerNftBalance = await ssafyNFTContract.balanceOf(buyer, {
      from: buyer,
    });
    let currentBuyerNftId = await ssafyNFTContract.tokenIDsoftWallet(buyer, {
      from: buyer,
    });
    // 판매자의 NFT 보유량 확인
    let currentSellerNftBalance = await ssafyNFTContract.balanceOf(seller, {
      from: seller,
    });
    let currentSellerNftId = await ssafyNFTContract.tokenIDsoftWallet(seller, {
      from: seller,
    });
    console.log(
      "--------------------------check buyer NFT---------------------------"
    );
    console.log("currentBuyerNftId = " + currentBuyerNftId);
    console.log("currentBuyerNftBalance = " + currentBuyerNftBalance);
    assert.notEqual(
      baseBuyerNftBalance,
      currentBuyerNftBalance,
      "fail to buy NFT"
    );
    console.log(
      "--------------------------check seller NFT---------------------------"
    );
    console.log("currentSellerNftId = " + currentSellerNftId);
    console.log("currentSellerNftBalance = " + currentSellerNftBalance);
    assert.notEqual(
      baseSellerNftBalance,
      currentSellerNftBalance,
      "fail to sell NFT"
    );

    console.log(
      "--------------------------check NFT Sale deleted after sell---------------------------"
    );
    allSales = await saleFactoryContract.allSales();
    console.log("allSales = " + allSales);
    assert.equal(allSales.length, 0, "fail to delete allSales[0] after sell");

    // 판매자가 구매한 NFT를 다시 판매
    console.log(
      "----------------------buyer resell NFT to seller------------------------"
    );
    console.log("create first NFT sales order");
    await saleFactoryContract.createSale(
      parseInt(currentBuyerNftId[0]),
      price,
      ssafyTokenContract.address,
      ssafyNFTContract.address,
      { from: buyer }
    );
    // 판매 열렸는지 확인
    allSales = await saleFactoryContract.allSales();
    console.log("allSales = " + allSales);
    assert.notEqual(allSales.length, 0, "seller fail to create Sale");

    // New Sale Contract 호출
    currentSale = allSales[0];
    salesContract = await Sale.at(currentSale);
    await ssafyTokenContract.approve(currentSale, price, { from: seller });
    console.log(
      "--------------------------try to purchase--------------------------"
    );
    await salesContract.purchase({ from: seller });
    // 판매자의 송금제한금액을 다시 0으로 초기화
    await ssafyTokenContract.approve(currentSale, 0, { from: seller });
    console.log(
      "------------------------Buyer and Seller Balance----------------"
    );
    currentBuyerBalance = await ssafyTokenContract.balanceOf(buyer);
    currentSellerBalance = await ssafyTokenContract.balanceOf(seller);
    console.log("currentBuyerBalance = " + currentBuyerBalance);
    console.log("currentSellerBalance = " + currentSellerBalance);

    // 구매자와 판매자의 NFT 보유량 확인
    console.log(
      "------------------------Buyer and Seller NFT Balance----------------"
    );
    currentBuyerNftBalance = await ssafyNFTContract.balanceOf(buyer, {
      from: buyer,
    });
    currentBuyerNftId = await ssafyNFTContract.tokenIDsoftWallet(buyer, {
      from: buyer,
    });
    // 판매자의 NFT 보유량 확인
    currentSellerNftBalance = await ssafyNFTContract.balanceOf(seller, {
      from: seller,
    });
    currentSellerNftId = await ssafyNFTContract.tokenIDsoftWallet(seller, {
      from: seller,
    });
    console.log(
      "--------------------------check buyer NFT---------------------------"
    );
    console.log("currentBuyerNftId = " + currentBuyerNftId);
    console.log("currentBuyerNftBalance = " + currentBuyerNftBalance);
    assert.notEqual(
      baseBuyerNftBalance,
      currentBuyerNftBalance,
      "fail to sell NFT"
    );
    console.log(
      "--------------------------check seller NFT---------------------------"
    );
    console.log("currentSellerNftId = " + currentSellerNftId);
    console.log("currentSellerNftBalance = " + currentSellerNftBalance);
    assert.notEqual(
      baseSellerNftBalance,
      currentSellerNftBalance,
      "fail to buy NFT"
    );
  });
});
