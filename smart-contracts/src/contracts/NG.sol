// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./tokens/ERC721/ERC721Connector.sol";

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

    uint256[] public blockNos;
    // string[] public txnHashes;

    // minted account address => token ids
    mapping(address => uint256[]) private _mintedTokens;

    // mapping for block number (previous txn hash)
    // tokenId => block numbers
    mapping(uint256 => uint256[]) private _tokenHistory;

    // mapping(NGInfo => bool) _ngExists;
    // mapping(string => bool) _ngExists;

    mapping(address => uint8) _accountsAuth; // 일반: 0, 기업: 1, 관리자: 2

    // txnhash -> tokenid
    mapping(string => uint256) private _txnHashToTokenId;

    //ng) input: txnhash, output: NG
    function getNGFromTxnHash(string memory _txnHash) public view returns (NGInfo memory) {
        return ngs[_txnHashToTokenId[_txnHash]];
    } 
    //ng) input: txnhash & tokenId
    //ng) mint, transfer시 front에서 호출
    function setTxnHashToTokenId(string memory _txnHash, uint256 _tokenId) public {
        _txnHashToTokenId[_txnHash] = _tokenId;
    }

    //ng) msg.sender가 발행한 토큰 목록 가져오기 (토큰 아이디 리턴)
    function getMintedTokens() public view returns (uint256[] memory) {
        return _mintedTokens[msg.sender];
    }

    // function getTxnHash(uint256 _tokenId) public view returns (string memory) {
    //     return txnHashes[_tokenId];
    // }

    // function setTxnHash(uint256 _tokenId, string memory _txnHash) public {
    //     txnHashes[_tokenId] = _txnHash;
    // }

    function getBlockHash(uint256 _idx) public view returns (bytes32) {
        uint256 _blockNo = blockNos[_idx];
        return blockhash(_blockNo);
    }

    modifier checkZeroAddress(address _address) {
        require(_address != address(0));
        _;
    }

    function getAccountAuth(address _address)
        public
        view
        checkZeroAddress(_address)
        returns (uint8)
    {
        uint8 _auth = _accountsAuth[_address];
        return _auth;
    }

    function setBrandAccountAuth(address _address)
        public
        checkZeroAddress(_address)
    {
        _accountsAuth[_address] = 1;
    }

    function setAdminAccountAuth(address _address)
        public
        checkZeroAddress(_address)
    {
        _accountsAuth[_address] = 2;
    }

    modifier ngExists(
        string memory _brandNm,
        string memory _productNo,
        string memory _serialNo,
        string memory _mfd,
        string memory _madeIn
    ) {
        bool check = false;
        for (uint256 i = 0; i < ngs.length; i++) {
            if (
                keccak256(bytes(ngs[i].brandNm)) ==
                keccak256(bytes(_brandNm)) &&
                keccak256(bytes(ngs[i].productNo)) ==
                keccak256(bytes(_productNo)) &&
                keccak256(bytes(ngs[i].serialNo)) ==
                keccak256(bytes(_serialNo)) &&
                keccak256(bytes(ngs[i].mfd)) == keccak256(bytes(_mfd)) &&
                keccak256(bytes(ngs[i].madeIn)) == keccak256(bytes(_madeIn))
            ) {
                check = true;
            }
        }
        require(!check, "Error _ngInfo already exists");
        _;
    }

    function addTokenHistory(uint256 _tokenId) private {
        _tokenHistory[_tokenId].push(block.number);
    }

    function getTokenHistory(uint256 tokenId)
        public
        view
        returns (uint256[] memory)
    {
        return _tokenHistory[tokenId];
    }

    function transferNG(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        _transferNG(_from, _to, _tokenId);
        uint256 _index = getIndexFromTokenId(_tokenId);
        blockNos[_index] = block.number;

        addTokenHistory(_tokenId);
    }

    function mint(
        string memory _brandNm,
        string memory _productNo,
        string memory _serialNo,
        string memory _mfd,
        string memory _madeIn
    ) public ngExists(_brandNm, _productNo, _serialNo, _mfd, _madeIn) {
        NGInfo memory _ngInfo = NGInfo(
            _brandNm,
            _productNo,
            _serialNo,
            _mfd,
            _madeIn
        );
        // require(ngs[_ngInfo]!='', 'Error _ngInfo already exists');
        // require(!_ngExists[_ngInfo], 'Error _ngInfo already exists');

        ngs.push(_ngInfo);
        blockNos.push(block.number);
        uint256 _id = ngs.length - 1;
        _mint(msg.sender, _id);

        _mintedTokens[msg.sender].push(_id);
        addTokenHistory(_id);
        // _ngExists[_ngInfo] = true;
    }

    // function mint(string memory _ng) public {
    //     require(!_ngExists[_ng], 'Error -ng already exists');

    //     ngs.push(_ng);
    //     uint256 _id = ngs.length - 1;
    //     _mint(msg.sender, _id);

    //     _ngExists[_ng] = true;
    // }

    constructor(string memory named, string memory symbolified)
        ERC721Connector(named, symbolified)
    {}
}
