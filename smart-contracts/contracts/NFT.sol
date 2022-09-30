// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721Enumerable {
    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    event mintNFT(
        uint256 indexed _tokenId,
        address indexed _owner,
        string _tokenURI
    );

    constructor() ERC721("Space109", "SSF") {}

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
        _mint(to, tokenId);
        emit mintNFT(tokenId, to, _tokenURI);
        return tokenId;
    }

    function tokenIDsofWallet(address _owner)
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
            URIs[i] = tokenURIs[tokenOfOwnerByIndex(_owner, i)];
        }
        return URIs;
    }
}
