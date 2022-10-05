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

    //ng) msg.sender가 소유한 토큰 목록 가져오기
    function getOwnedTokens(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return _ownedTokens[_address];
    }

    function _transferNG(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        transferFrom(_from, _to, _tokenId);

        uint256 index = _ownedTokensIndex[_tokenId];
        // delete 시, 배열의 값이 초기값으로 초기화되는 것이 전부 >> 현재 배열에서는 해당 위치의 값이 0으로 초기화만 됨
        delete _ownedTokens[_from][index];
        // 데이터 삭제 처리를 위한 shifting
        for (uint256 i = index; i < _ownedTokens[_from].length - 1; i++) {
            _ownedTokens[_from][i] = _ownedTokens[_from][i + 1];
            uint256 tokenid = _ownedTokens[_from][i];
            _ownedTokensIndex[tokenid]--;
        }
        _ownedTokens[_from].pop();

        _addTokensToOwnerEnumeration(_to, _tokenId);
    }

    //NG에서 _allTokensIndex에 접근하기 위해 추가함 (function transfer)
    function getIndexFromTokenId(uint256 _tokenId)
        public
        view
        returns (uint256)
    {
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

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }
}
