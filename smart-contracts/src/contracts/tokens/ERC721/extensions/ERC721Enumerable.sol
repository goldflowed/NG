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

    //NG에서 _allTokensIndex에 접근하기 위해 추가함 (function transfer)
    function getIndexFromTokenId(uint256 _tokenId) public view returns(uint256){
        return _allTokensIndex[_tokenId];
    }

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

    // 상속을 통해서 재정의한 함수를 표시
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        //  1. add tokens to the owner: 소유자 추적 
		//    -> 소유자에게 토큰을 추가하는 함수 필요
		_addTokensToOwnerEnumeration(to, tokenId);

		//  2. all tokens to our totalsupply - to allTokens: 총 공급 추적 
		//    -> allTokens에 토큰을 추가하는 함수 필요
		_addTokensToAllTokenEnumeration(tokenId);
    }

    	// add tokens to the _allTokens array and set the position of the tokens indexes.
	function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
		// _allTokensIndex[tokenId]: tokenId에 해당하는 토큰을 가져온다
		_allTokensIndex[tokenId] = _allTokens.length;
		_allTokens.push(tokenId);

		// 토큰을 추가할 때 어디에 있는 tokenID 뿐만 아니라 그 위치의 길이도 추적한다. 
	}

	function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private{
		// EXERCISE - CHALLENGE - DO THESE THREE THINGS:
		// 1. add address and token id to the _ownedTokens
		// 2. _ownedTokensIndex tokenId set to address of ownedTokens position
		// 3. we want to execute the function with minting
		_ownedTokens[to].push(tokenId);
		_ownedTokensIndex[tokenId] = _ownedTokens[to].length;

	}
}
