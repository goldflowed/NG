// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721/ERC721Connector.sol';

contract NG is ERC721Connector {
    // struct로 nft 정보 저장해서 해당 struct 배열로 nft 관리하기
    string[] public ngs;

    mapping(string => bool) _ngExists;

    function mint(string memory _ng) public {
        require(!_ngExists[_ng], 'Error -ng already exists');

        ngs.push(_ng);
        uint256 _id = ngs.length - 1;
        _mint(msg.sender, _id);

        _ngExists[_ng] = true;
    }

    constructor(string memory named, string memory symbolified) ERC721Connector(named, symbolified){}
}
