// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../ERC721.sol";
import "./IERC721Enumerable.sol";

contract ERC721Enumerable is IERC721Enumerable, ERC721 {
    // index ID기반으로 모든 토큰의 소유자를 추적할 수 있어야 함
    uint256[] private _allTokens;

    // tokenId to position in _allTokens
    mapping(uint256 => uint256) private _allTokensIndex;

    // owner to list of all owner token ids
    mapping(address => uint256[]) private _ownedTokens;

    // token ID index to owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    constructor() {
        _registerInterface(
            bytes4(
                keccak256("totalSupply(bytes4)") ^
                    keccak256("tokenByIndex(bytes4)") ^
                    keccak256("tokenOfOwnerByIndex(bytes4)")
            )
        );
    }

    // ERC165 함수 Overriding
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // 현재 토큰의 갯수 return
    function totalSupply() public view override returns (uint256) {
        return _allTokens.length;
    }

    // index 값에 대응되는 token address return
    function tokenByIndex(uint256 index)
        external
        view
        override
        returns (uint256)
    {
        require(index < totalSupply(), "global index is out of bounds!");
        return _allTokens[index];
    }

    // owner가 가진 토큰 중 index에 맞는 tokenId return
    function tokenOfOwnerByIndex(address owner, uint256 index)
        external
        view
        override
        returns (uint256)
    {
        require(index < balanceOf(owner), "owner index is out of bounds!");
        return _ownedTokens[owner][index];
    }

    // 상속을 통해서 재정의한 함수를 표시
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
    }
}
