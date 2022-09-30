// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "./token/ERC721/ERC721.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721enumerable.sol";
import "./token/ERC721/extensions/ERC721enumerable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721Enumerable {
    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    event mintNFT(
        uint256 indexed _tokenId,
        address indexed _owner,
        string _tokenURI
    );

    constructor() ERC721("space109", "b109") {}

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI)
        public
        returns (uint256)
    {
        uint256 tokenId = current() + 1;
        tokenURIs[tokenId] = _tokenURI;
        _tokenIds = tokenId;
        // to = seller address
        _mint(to, tokenId);
        emit mintNFT(tokenId, to, _tokenURI);
        return tokenId;
    }

    function tokenIDsoftWallet(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURIsofWallet(address _owner)
        public
        view
        returns (string[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        string[] memory URIs = new string[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            URIs[i] = tokenURI(tokenOfOwnerByIndex(_owner, i));
        }
        return URIs;
    }

    // function tokenURIs() public view returns (uint256[] memory){

    // }

    // function getMySaleNftList() public view returns (uint256[] memory) {
    //     // get my tokenIds from tokenIds array
    //     uint256[] memory myTokenIds = tokenIDsoftWallet(msg.sender);
    //     for (uint256 i; i < myTokenIds.length; i++) {

    //     }
    //     return myTokenIds;
    // }
}
