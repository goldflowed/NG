// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../utils/introspection/ERC165.sol";
import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "../../utils/Context.sol";
import "../../utils/Address.sol";

/*
    어떤 주소로 누가 NFT를 minting 하는지가 중요함

    mint 함수를 구성할 때 필요한 작업
    1. NFT가 주소를 제대로 가리키도록 명시
    2. 토큰 ID를 추적한다. [모든 NFT는 하나의 Token]
        > 생성되는 NFT 마다 1, 2, 3.. 순서를 매길 예정
    3. 토큰 ID에 대한 토큰 소유자의 주소 추적
    4. 주소 또는 소유자의 주소에 대해 몇 개의 NFT가 존재하는지 추적
    5. 이벤트를 생성하여 '전송 로그'를 방출할 수 있음
        > 계약 주소, 민팅된 위치, ID etc..

*/

contract ERC721 is Context, ERC165, IERC721 {
    using Address for address;

    // Solidity의 Mapping : Hash Table을 생성하여 키-값 쌍으로 추적
    // 토큰 ID를 소유자에게 Mapping
    mapping(uint256 => address) private _tokenOwner;
    // 소유자를 토큰 개수로 Mapping
    // mapping(address => uint256) private _OwnedTokensCount;
    mapping(address => uint256) private _balances;
    // 토큰 ID를 승인 주소로 Mapping
    mapping(uint256 => address) private _tokenApprovals;
    // 부여된 토큰 operator 및 권한 정보
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    constructor() {
        // ERC165의 registerInterface 작업 처리..?
    }

    // owner가 몇 개의 token을 가졌는지 return
    function balanceOf(address owner) public view override returns (uint256) {
        require(owner != address(0), "owner query for non-existent token");

        return _balances[owner];
    }

    // tokenId를 통해서 해당 token의 owner return
    function ownerOf(uint256 _tokenId) public view override returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "owner query for non-existent token");
        return owner;
    }

    // NFT 소유자에 대한 주소를 확인하여 해당 NFT가 mint되었는지를 알 수 있음
    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    // virtual : 상속을 통한 재정의 [override] 가 가능함을 표시함
    function _mint(address to, uint256 tokenId) internal virtual {
        // 주소가 0이 아님을 판별
        require(to != address(0), "ERC721: minting to the zero address");
        // 토큰이 존재하지 않음을 판별
        require(!_exists(tokenId), "ERC721: token already minted");

        // mint 작업에 대한 tokenId와 새로운 주소를 추가
        _tokenOwner[tokenId] = to;
        // minting되는 주소를 추적하고 +1
        _balances[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(
            isApprovedOrOwner(msg.sender, _tokenId),
            "sender is not token Owner or Approved"
        );
        _transferFrom(_from, _to, _tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(
            ownerOf(_tokenId) == _from,
            "Trying to transfer a token the address does not own!"
        );
        require(
            _to != address(0),
            "Error - ERC721 Transfer to the zero address"
        );

        /*  unchecked block : overflow 또는 underflow가 발생하는지 solidity는 늘 확인하는데
            해당 작업에서 '가스'가 소모된다.
            unchecked block으로 묶인 코드는 solidity가 굳이 확인하지 않고 넘어가게되어
            overflow나 underflow가 발생할 일 없는 코드를 해당 block에 담으면 '가스 절약'을 할 수 있다.
            하지만, overflow / underflow 등의 문제가능성을 체크하지 않아 오류나 무한loop에 빠지게 될 수 있으니 사용 시 주의가 필요하다.
        */
        unchecked {
            _balances[_from] -= 1;
            _balances[_to] += 1;
        }

        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        // overloading 된 safeTransferFrom 의 data 매개변수가 callback 지정이면 오류가 발생함
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        require(
            isApprovedOrOwner(msg.sender, tokenId),
            "sender is not token Owner or Approved"
        );
        _safeTransferFrom(from, to, tokenId, data);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal {
        _transferFrom(from, to, tokenId);
        require(
            _checkOnERC721Received(from, to, tokenId, data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from 주어진 토큰ID의 이전 소유자를 대표하는 주소
     * @param to 토큰을 받게될 대상의 주소
     * @param tokenId uint256 이동될 토큰의 ID
     * @param data bytes 요청과 함께 보낼 최적의 데이터
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        // isContract() : Address.sol에 정의됨
        if (to.isContract()) {
            try
                IERC721Receiver(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    data
                )
            returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert(
                        "ERC721: transfer to non ERC721Receiver implementer"
                    );
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    // 요청하는 지갑이 tokenId에 대한 권한자 또는 소유자인지 판별하는 함수..?
    function isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        // 해당 tokenId가 mint된 tokenId인지 확인
        require(_exists(tokenId), "token dose not exist");
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender);
    }

    /*
        approve : tokenId에 대한 사용/소유권을 승인하는 함수
        1. 승인하는 사람은 tokenId의 소유자(owner) 혹은 권한자(operator)여야 한다.
        2. 스스로에게 토큰의 권한을 허용하는 것은 불가능
        3. 위 사항을 확인하고 승인 주소에 대한 map을 update
    */
    function approve(address _to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(_to != owner, "Error - approval to current owner");
        require(
            msg.sender == owner || isApprovedForAll(owner, _msgSender()),
            "Caller is not token owner or approved for all"
        );

        _tokenApprovals[tokenId] = _to;
        emit Approval(owner, _to, tokenId);
    }

    function getApproved(uint256 tokenId)
        public
        view
        override
        returns (address)
    {
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool _approved)
        public
        override
    {
        address owner = _msgSender();
        require(owner != operator, "approve to caller");
        _operatorApprovals[owner][operator] = _approved;

        emit ApprovalForAll(owner, operator, _approved);
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }
}
