// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./extensions/IERC721Metadata.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/Strings.sol";
import "../../utils/introspection/ERC165.sol";

/**
 * PJT Ⅰ - 과제 1 ERC-721 구현
 * @dev EIP-721을 준수하여 ERC721을 작성합니다.
 * https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    // 토큰의 이름 정의
    string private _name;

    // Token symbol
    // EX) Bored Ape Yacht Club인 경우 BAYC로 심볼을 정의
    string private _symbol;

    // Mapping from token ID to owner address
    // 해당 토큰의 ID로 토큰 소유자의 주소를 반환
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    // 토큰 소유자 계정 주소로 토큰 소유량을 반환
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    // 토큰 ID로 approve를 받은 계정 주소를 반환
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    // 토큰 소유자 계정과 operator 주소로 approve 여부를 확인
    // 예를 들어 0x1234 소유자 계정이 0x5678에게 approve한 경우 아래와 같이 boolean 값을 반환
    // _operatorApprovals[0x1234][0x5678] // true || false
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Optional mapping for token URIs
    // 옵션으로 있던 ERC721URIStorage.sol을 추가한것
    // 소스코드 경로 : https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol
    // tokenURI를 baseURI를 통해 그때그떄 생성하지 않고 store에 저장
    // 하지만 최근 컨트랙트 스타일은 이걸 사용하지 않는다.
    // https://velog.io/@heitzes/setTokenURI-vs-setBaseURI
    // https://forum.openzeppelin.com/t/why-doesnt-openzeppelin-erc721-contain-settokenuri/6373
    // “because using storage in this way is expensive and we decided to make the default mechanism significantly cheaper.”
    // 토큰id와 토큰uri를 맵핑하는 storage를 사용하는 방식은 비싸기 때문이다!
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     * 인터페이스대로 구현됐는지 확인
     * 우리가 상속받고있는 ERC165, IERC721, IERC721Metadata에대해 전부 판별
     * 이 함수의 파라미터로 ERC-721의 인터페이스 ID를 입력해야만, ERC-721 스마트 컨트랙트가 정상적으로 동작합니다
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        // type 을 이용한 표준 판별 로직 구현
        // https://docs.soliditylang.org/en/v0.8.16/units-and-global-variables.html?highlight=type#type-information
        // 인터페이스 유형에 대해 type(I).interfaceId를 요청할 수 있음
        // interfaceID ⇒ 함수에 대한 정보를 16진수로 표현하는것.(ERC165 인터페이스에서 사용함)
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     * 특정 주소(오너)가 소유한 NFT 갯수를 반환한다.
     */
    function balanceOf(address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        // 주소값은 address(0)이 될 수 없다.
        // 로그를 보면 address(0)는 '0x0000000000000000000000000000000000000000' 의 값을 리턴한다.
        // https://stackoverflow.com/questions/48219716/what-is-address0-in-solidity
        // https://bbokkun.tistory.com/166
        require(
            owner != address(0),
            "ERC721: balance query for the zero address"
        );
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     * 특정 토큰ID를 가진 NFT의 소유자 주소를 반환한다.
     *
     */
    function ownerOf(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     * ERC721에서 token URI는 토큰아이디와 base URI의 조합으로 만들어 진다.
     * 아래 함수는 토큰아이디에서 base URI를 가지고온다.
     * 빈 문자열을 반환할수도있다
     * 토큰아이디가 없는경우 되돌린다(Reverts)
     * https://it-timehacker.tistory.com/230
     *
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        // 토큰아이디가 있는지 없는지 체크
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        // _baseURI가 무조건 ""를 반환하는데
        // 그럼 아래 리턴은 무조건 ""반환이네?ㄷㄷ
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *지정된 토큰에 토큰URI를 설정하는 내부함수다.
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    //  Base URI for computing {tokenURI}. If set, the resulting URI for each
    //  token will be the concatenation of the `baseURI` and the `tokenId`. Empty
    //  by default, can be overridden in child contracts.
    //  base URI를 반환해준다.
    //  BaseURI는 minting하고자 하는 nft의 metadata들을 모아둔 폴더의 URI이다.
    //  https://velog.io/@heitzes/setTokenURI-vs-setBaseURI
    //  opensea와 같은 marketplace에서 사용자가 nft를 민팅하는 경우
    //  TokenURI 방식이 비용면에서 유리하다고하여 사용하지 않는듯 하다.
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     * approve는 ERC-20의 approve와 동일하다
     * 특정 계정으로 NFT를 사용하도록 양도를 허용한다.
     * approve() 함수로 권한을 양도받은 위탁자를 operator라고 부릅니다.
     * 토큰의 소유권을 다루고 있는 만큼 owner나 권한을 위임받은 operator만 호출할 수 있다.
     * 내장 함수 _approve() 함수를 호출해서 최종적으로 Approval Event를 발생시킨다.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     * 특정 Token이 다른 operator에게 승인된 상태인 경우 승인받은 operator의 계정 주소를 반환한다.
     * => 현재 오너로 부터 권한을 받은 오퍼레이터의 주소(account)를 반환해준다.
     * tokenId가 반드시 존재해야한다.
     * 만약 누구에게도 승인되지 않은 경우 0x0 주소를 반환한다.(위에 address(0)관련 설명 있음)
     */
    function getApproved(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     * 오퍼레이터의 모든자산을 관리할수 있는 권한을 부여/제거할 수 있다.
     * => NFT토큰 소유자가 해당 주소에게 모든 NFT 토큰에 대한 전송 권한을 부여 또는 해제한다.
     * 호출한 NFT토큰 owner는 자신이 보유한 모든 NFT토큰에 대해 operator가 전송 권한을 갖게 할 수 있다.
     * _approved 변수에 true를 입력하면 모든 토큰에 대한 전송 권한을 갖게, false를 입력하면 모든 토큰에 대한 전송 권한을 취소하게 된다.
     * 출처: https://earthteacher.tistory.com/94 [개발자를 위한 4차원 주머니:티스토리]
     */
    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     * 오퍼레이터에게 오너의 모든 자산을 관리할 수 있는 권한 여부 를 리턴한다.
     * => setApprovalForAll의 권한이 있는지 bool 형태로 리턴한다.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     * Token의 소유권을 from 으로 부터 to로 이동시킨다..
     * from은 정당한 Token의 소유자이거나 사용권을 위임받은 opertoar여야만 한다..
     */
    function transferFrom(
        // seller
        address from,
        // buyer
        address to,
        // NFT ID
        uint256 tokenId
    ) public virtual override returns (bool) {
        //solhint-disable-next-line max-line-length
        //    아래코드 삭제
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _transfer(from, to, tokenId);

        return true;
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(
            _checkOnERC721Received(from, to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Returns whether `tokenId` exists.
     * 토큰아이디가 있는지 없는지 bool값 반환
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     * 'spender'가 'tokenId'를 관리할 수 있는지 여부를 반환한다.
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        virtual
        returns (bool)
    {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     * 'tokenId'를 안전하게 민팅하고 'to'로 전송한다.
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     * 새 토큰을 발행한다. 지정된 토큰 ID가 이미 있는 경우 되돌린다.(reverts).
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        // to = seller
        _beforeTokenTransfer(address(0), to, tokenId);

        // 해당 토큰의 소유자인 to의 nft개수를 +1해준다.
        _balances[to] += 1;
        // 해당 토큰아이디의 소유자를 to로 설정해준다.
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        // require(
        //     ERC721.ownerOf(tokenId) == from,
        //     "ERC721: transfer from incorrect owner"
        // );
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        // from의 NFT개수를 하나 차감
        _balances[from] -= 1;
        // to의 NFT 개수를 하나 추가
        _balances[to] += 1;
        // 해당 토큰ID의 권한을 to에게 넘김
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     * to를 해당 토큰아이디의 오퍼레이터로 승인한다.
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     * 위에 이미 설명 있음 setApprovalForAll
     * Emits a {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * @dev The call is not executed if the target address is not a contract.
     * @dev 토큰을 받는 당사자의컨트랙트에 onERC721Received()함수가 제대로 구현되었는지 확인하는 함수이다.
     * @dev 사실 이건 잘 모르겠다.
     * @dev https://velog.io/@bcdy19/Blockchain-ERC-721-%ED%95%A8%EC%88%98%EC%9D%98-%EA%B8%B0%EB%8A%A5
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try
                IERC721Receiver(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    _data
                )
            returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert(
                        "ERC721: transfer to non ERC721Receiver implementer"
                    );
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}
