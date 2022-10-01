// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/extensions/ERC721enumerable.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    // 본 컨트랙트의 생성자이자 최고관리자
    address public admin;
    // 판매중인 NFT들의 컨트랙트 주소들을 저장하는 배열
    address[] public sales;
    // 판매중인 NFT의 tokenid를 저장하는 배열
    // uint256[] public nfts;
    // // 판매중인 NFT의 owner를 저장하는 배열
    // address[] public owners;

    struct SaleData {
        uint256 itemId;
        uint256 purchasePrice;
        address owner;
        address currencyAddress;
        address nftAddress;
        address saleAddress;
    }
    // 판매중인 NFT의 컨트랙트를 기반으로 안에 데이터들을 저장해주는 매핑
    // mapping(address => SaleData) saleDatas;
    SaleData[] public saleDatas;
    event NewSale(
        // 생성된 판매 컨트랙트 주소
        address indexed _saleContract,
        // 해당 컨트랙트의 소유자(판매자)
        address indexed _owner,
        // 뭔지 모르겠음 확인 필요
        uint256 _workId
    );

    event CancleSale(address _cancledAddress, bool isCancled);

    // 생성자에서 admin을 설정.
    constructor() {
        admin = msg.sender;
    }

    //  특정 NFT에 대한 판매 컨트렉트를 생성
    function createSale(
        // 토큰 주소
        uint256 itemId,
        // 판매 가격
        uint256 purchasePrice,
        // 화폐 주소(SSF를 기반으로함. 공지사항에 있음)
        // 7기 ERC-20 토큰(SSF) 컨트랙트 주소
        // Contract Address: 0x0c54E456CE9E4501D2c43C38796ce3F06846C966
        address currencyAddress,
        // NFT 주소
        address nftAddress
    ) public returns (address) {
        address sale = address(
            // 아래 판매 컨트랙트 정의부분에서의 생성자에 필요한 목록들
            // address _admin,
            // address _seller,
            // uint256 _tokenId,
            // uint256 _purchasePrice,
            // address _currencyAddress,
            // address _nftAddress
            new Sale(
                admin,
                msg.sender,
                itemId,
                purchasePrice,
                currencyAddress,
                nftAddress
            )
        );
        // // Sale컨트랙트에게 seller의 NFT 관리 권한을 부여한다.
        // IERC721Enumerable(nftAddress).setApprovalForAll(sale, true);
        sales.push(sale);
        saleDatas.push(
            SaleData(
                itemId,
                purchasePrice,
                msg.sender,
                currencyAddress,
                nftAddress,
                sale
            )
        );
        // event NewSale(
        //     address indexed _saleContract,
        //     address indexed _owner,
        //     uint256 _workId
        // );
        emit NewSale(sale, msg.sender, itemId);
        return sale;
    }

    // 모든 판매 컨트랙트 목록 가지고오기.
    function allSales() public view returns (address[] memory) {
        return sales;
    }

    // 모든 판매 목록의 NFTid 목록 가지고오기.
    function allSalesNfts() public view returns (uint256[] memory) {
        uint256[] memory nfts = new uint256[](saleDatas.length);
        for (uint256 i = 0; i < saleDatas.length; i++) {
            nfts[i] = saleDatas[i].itemId;
        }
        return nfts;
    }

    function cancleSales() public returns (bool) {
        bool iscancled = false;
        // 탐색 후 지우기
        for (uint256 i = 0; i < sales.length; i++) {
            // 팝을 한 녀석을 삭제할 인덱스에 넣어준다.
            if (sales[i] == msg.sender) {
                sales[i] = sales[sales.length - 1];
                sales.pop();
                saleDatas[i] = saleDatas[saleDatas.length - 1];
                saleDatas.pop();
                // delete sales[i];
                // return true;
                iscancled = true;
                break;
            }
        }
        emit CancleSale(msg.sender, iscancled);
        return iscancled;
        // return false;
    }

    function getMySaleNftList() public view returns (uint256[] memory) {
        uint256[] memory nfts = new uint256[](saleDatas.length);
        uint256 count = 0;
        for (uint256 i = 0; i < saleDatas.length; i++) {
            if (saleDatas[i].owner == msg.sender) {
                nfts[count] = saleDatas[i].itemId;
                count++;
            }
        }
        return nfts;
    }

    // 토큰 아이디 기반으로 NFT의 판매 정보(판매가격 + purchase함수 불러올 수 있는 ca값) 가져오기
    function getSaleData(uint256 tokenId)
        public
        view
        returns (SaleData memory)
    {
        for (uint256 i = 0; i < saleDatas.length; i++) {
            if (saleDatas[i].itemId == tokenId) {
                return saleDatas[i];
            }
        }
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
//  -----------------------------------------------
// 판매 컨트랙트 생성함수부
contract Sale {
    // 생성자에 의해 정해지는 값
    // 판매자
    address public seller;
    // 구매자
    address public buyer;
    // 슈퍼 권한자
    address admin;
    // NFT 판매 가격
    uint256 public purchasePrice;
    // NFT 아이템 ID
    uint256 public tokenId;
    // 화폐 주소(ERC20)
    address public currencyAddress;
    // NFT 컨트랙트 주소(ERC721)
    address public nftAddress;
    // 판매 on,off 여부
    bool public isOnSale;

    address parentContract;

    IERC20 public erc20Contract;
    IERC721Enumerable public erc721Constract;

    // 판매가 끝났을때 발생하는 이벤트
    // emit 함수를 통해 이벤트를 발생시킨다.
    event SaleEnded(address buyer, uint256 amount);

    // 생성자 함수
    // 컨트랙트가 생성될 때 딱 한번만 실행됨
    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _purchasePrice,
        address _currencyAddress,
        address _nftAddress
    ) {
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        isOnSale = true;
        parentContract = msg.sender;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721Enumerable(_nftAddress);
    }

    // 즉시 구매하기
    function purchase() public {
        // require(msg.sender != seller, "cannot buy own nft");
        // require(
        //     _getCurrencyAmount() >= purchasePrice,
        //     "You don't have enough balance."
        // );
        // require(msg.sender == buyer, "only buyer can confirm");

        buyer = msg.sender;
        require(seller != buyer, "cannot buy own nft");
        confirmItem();
    }

    // 구매 완료
    function confirmItem() public {
        erc20Contract.transferFrom(buyer, seller, purchasePrice);
        // 잔액이 옮겨지는것까지 확인
        // Sale 컨트랙트가 NFT를 옮길수있게 권한을 줘야한다.
        // erc721Constract.approve();
        erc721Constract.transferFrom(seller, buyer, tokenId);
        deleteSales();
        _end();
        emit SaleEnded(buyer, purchasePrice);
    }

    // 판매 취소
    function cancelSales() public {
        require(msg.sender == seller, "only seller can cancel");
        parentContract.call(abi.encodeWithSignature("cancleSales()"));
        _end();
    }

    // 판매 종료
    function deleteSales() internal {
        parentContract.call(abi.encodeWithSignature("cancleSales()"));
    }

    // 판매 NFT 정보
    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address
        )
    {
        return (purchasePrice, tokenId, currencyAddress, nftAddress);
    }

    // 작업 종료
    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        isOnSale = false;
    }

    // 구매자의 지갑 잔액 확인
    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // function isOnSale() private view returns (bool) {
    //     return isOnSale;
    // }

    // 판매자만 실행할 수 있도록 컨트롤
    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
    // 판매 컨트랙트 생성함수부 종료
    //  -----------------------------------------------
}
