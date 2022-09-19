// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './tokens/ERC721/ERC721Connector.sol';

contract NG is ERC721Connector {
    // struct로 nft 정보 저장해서 해당 struct 배열로 nft 관리하기
    struct NGInfo {
        string brandNm;
        string productNo;
        string serialNo;
        string mfd;
        string madeIn;
    }

    NGInfo[] public ngs;
    // string[] public ngs;

    // mapping(NGInfo => bool) _ngExists;
    // mapping(string => bool) _ngExists;

    modifier ngExists(
        string memory _brandNm,
        string memory _productNo,
        string memory _serialNo,
        string memory _mfd,
        string memory _madeIn
    )
    {
        bool check = false;
        for (uint256 i=0; i<ngs.length; i++) {
            if (keccak256(bytes(ngs[i].brandNm))==keccak256(bytes(_brandNm)) &&
            keccak256(bytes(ngs[i].productNo))==keccak256(bytes(_productNo)) &&
            keccak256(bytes(ngs[i].serialNo))==keccak256(bytes(_serialNo)) &&
            keccak256(bytes(ngs[i].mfd))==keccak256(bytes(_mfd)) &&
            keccak256(bytes(ngs[i].madeIn))==keccak256(bytes(_madeIn))) {
                check = true;
            }
        }
        require(!check, 'Error _ngInfo already exists');
        _;
    }

    function mint(
        string memory _brandNm,
        string memory _productNo,
        string memory _serialNo,
        string memory _mfd,
        string memory _madeIn
        ) 
        public 
        ngExists(
            _brandNm,
            _productNo,
            _serialNo,
            _mfd,
            _madeIn
        )
    {
        NGInfo memory _ngInfo = NGInfo(_brandNm, _productNo, _serialNo, _mfd, _madeIn);
        // require(ngs[_ngInfo]!='', 'Error _ngInfo already exists');
        // require(!_ngExists[_ngInfo], 'Error _ngInfo already exists');

        ngs.push(_ngInfo);
        uint256 _id = ngs.length - 1;
        _mint(msg.sender, _id);

        // _ngExists[_ngInfo] = true;
    }

    // function mint(string memory _ng) public {
    //     require(!_ngExists[_ng], 'Error -ng already exists');

    //     ngs.push(_ng);
    //     uint256 _id = ngs.length - 1;
    //     _mint(msg.sender, _id);

    //     _ngExists[_ng] = true;
    // }

    constructor(string memory named, string memory symbolified) ERC721Connector(named, symbolified){}
}
