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

    constructor() {}

    // ERC165 함수 Overriding from ERC721
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
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


    /**
     * @dev Enumerable 확장의 소유권 추적 데이터 구조에 토큰 추가 [address에 맞는 소유자가 가진 토큰 리스트에 추가]
     * @param to address 토큰ID의 새 소유자 주소
     * @param tokenId uint256 지정 주소의 토큰 목록에 추가할 토큰ID
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = ERC721.balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }

    /**
     * @dev Enumerable 확장의 토큰 추적 데이터 구조에 토큰 추가 [토큰 리스트에 추가함]
     * @param tokenId uint256 토큰 목록에 새롭게 추가 될 토큰ID
     */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }
    
    // 상속을 통해서 재정의한 함수를 표시
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        //  1. add tokens to the owner: 소유자 추적 
		//    -> 소유자에게 토큰을 추가하는 함수 필요
		_addTokenToOwnerEnumeration(to, tokenId);

		//  2. all tokens to our totalsupply - to allTokens: 총 공급 추적 
		//    -> allTokens에 토큰을 추가하는 함수 필요
		_addTokenToAllTokensEnumeration(tokenId);
    }


    /**
     * @dev 소유권 추적 데이터 구조에서 해당하는 토큰ID 제거
     * == 주의사항
     * 토큰에 새 소유자가 할당되지 않는 동안 _ownedTokensIndex mapping이 update되지 않는다.
     *  >> 이를 통해 '가스 최적화'를 함
     * @param from address 주어진 토큰 ID의 이전 소유자 [토큰ID를 지워야하는 대상]
     * @param tokenId uint256 지정 주소의 토큰 목록에서 지워야하는 토큰ID
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId)
        private
    {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = ERC721.balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        delete _ownedTokensIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    /**
     * @dev 토큰 추적 데이터 구조에서 해당하는 토큰ID 제거
     * @param tokenId uint256 토큰 목록에서 지워야하는 토큰ID
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }
}
