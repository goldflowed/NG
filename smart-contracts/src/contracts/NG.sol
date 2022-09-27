// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./tokens/ERC721/ERC721Connector.sol";

contract NG is ERC721Connector {
    // struct로 nft 정보 저장해서 해당 struct 배열로 nft 관리하기
    // 인증서 각각의 정보
    struct NGInfo {
        string serialNo;
        Product product;
    }

    // 브랜드별 품목에 대한 정보를 담는 struct
    struct Product {
        string brandNm;
        string productName;
        string productNo;
        string mfd;
        string madeIn;
        string price;
    }

    // 브랜드가 등록한 품목 리스트
    mapping(address => Product[]) private brandToProduct;
    // 브랜드가 등록한 품목의 index
    mapping(address => mapping(string => uint256)) private ProductToIndex;
    // 브랜드가 등록한 품목의 serial number당 인증서 목록
    mapping(address => mapping(uint256 => NGInfo[])) private ProductToNg;
    // tokenId 관리를 위한 전체 ngs 목록
    NGInfo[] public ngs;

    uint256[] public blockNos;

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

    // 브랜드 계정 주소로 등록된 품목 리스트 검색
    function getAddressToCategorys(address caller)
        public
        view
        returns (Product[] memory)
    {
        // return brandToCategory[msg.sender];
        return brandToProduct[caller];
    }

    // 브랜드 계정 주소 및 품목 번호로 품목의 index 검색
    function getCategoryIndex(address caller, string memory productNo)
        public
        view
        returns (uint256)
    {
        return ProductToIndex[caller][productNo];
    }

    // 브랜드 계정 주소 및 품목 index로 인증서 목록 검색
    function getProductidxToNgs(address caller, uint256 categoryIdx)
        public
        view
        returns (NGInfo[] memory)
    {
        return ProductToNg[caller][categoryIdx];
    }

    // 브랜드 계정 주소 및 품목 번호로 인증서 목록 검색
    function getProductnoToNgs(address caller, string memory productNo)
        public
        view
        returns (NGInfo[] memory)
    {
        uint256 idx = getCategoryIndex(caller, productNo);
        return ProductToNg[caller][idx];
    }

    //ng) input: txnhash, output: tokenId
    function getTokenIdFromTxnHash(string memory _txnHash)
        public
        view
        returns (uint256)
    {
        return _txnHashToTokenId[_txnHash];
    }

    //ng) input: txnhash & tokenId
    //ng) mint, transfer시 front에서 호출
    function setTxnHashToTokenId(string memory _txnHash, uint256 _tokenId)
        public
    {
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
        // 요청하는 계정은 0주소면 안되고, 관리자만 브랜드 권한 할당을 할 수 있다.
        require(
            msg.sender != address(0),
            "requesting account is not zero-account"
        );
        require(
            _accountsAuth[msg.sender] == 2,
            "requesting account have to auth 2"
        );

        // 이미 있는 주소도 추가할 수 없음
        require(
            _accountsAuth[_address] == 0,
            "registed account is can't regist again"
        );

        _accountsAuth[_address] = 1;
    }

    // 이건 사실.. 한 번 등록 해두고 아무도 접근을 못해야하는데..?
    function setAdminAccountAuth(address _address)
        public
        checkZeroAddress(_address)
    {
        _accountsAuth[_address] = 2;
    }

    modifier productExists(
        string memory _brandNm,
        string memory _productName,
        string memory _productNo,
        string memory _mfd,
        string memory _madeIn,
        string memory _price
    ) {
        bool check = false;
        for (uint256 i = 0; i < brandToProduct[msg.sender].length; i++) {
            if (
                keccak256(bytes(brandToProduct[msg.sender][i].brandNm)) ==
                keccak256(bytes(_brandNm)) &&
                keccak256(bytes(brandToProduct[msg.sender][i].productName)) ==
                keccak256(bytes(_productName)) &&
                keccak256(bytes(brandToProduct[msg.sender][i].productNo)) ==
                keccak256(bytes(_productNo)) &&
                keccak256(bytes(brandToProduct[msg.sender][i].mfd)) ==
                keccak256(bytes(_mfd)) &&
                keccak256(bytes(brandToProduct[msg.sender][i].madeIn)) ==
                keccak256(bytes(_madeIn)) &&
                keccak256(bytes(brandToProduct[msg.sender][i].price)) ==
                keccak256(bytes(_price))
            ) {
                check = true;
            }
        }
        require(!check, "Error Category already exists");
        _;
    }

    modifier ngExists(string memory _productNo, string memory _serialNo) {
        bool check = false;
        bool hasProduct = false;
        // 해당 품목 번호가 존재해야함
        Product[] memory cates = getAddressToCategorys(msg.sender);
        for (uint256 i = 0; i < cates.length; i++) {
            if (
                keccak256(bytes(cates[i].productNo)) ==
                keccak256(bytes(_productNo))
            ) {
                hasProduct = true;
            }
        }

        uint256 idx = ProductToIndex[msg.sender][_productNo];
        for (uint256 i = 0; i < ProductToNg[msg.sender][idx].length; i++) {
            if (
                // serialNo는 고유해야함 : NFT로써 유일성을 가지게 되는 핵심 정보
                // 해당 브랜드 해당 품목에서 시리얼번호는 중복되어서는 안됨
                keccak256(bytes(brandToProduct[msg.sender][idx].productNo)) ==
                keccak256(bytes(_productNo)) &&
                keccak256(bytes(ProductToNg[msg.sender][idx][i].serialNo)) ==
                keccak256(bytes(_serialNo))
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

    function addProduct(
        string memory _brandNm,
        string memory _productName,
        string memory _productNo,
        string memory _mfd,
        string memory _madeIn,
        string memory _price
    )
        public
        productExists(_brandNm, _productName, _productNo, _mfd, _madeIn, _price)
    {
        Product memory category = Product(
            _brandNm,
            _productName,
            _productNo,
            _mfd,
            _madeIn,
            _price
        );

        ProductToIndex[msg.sender][_productNo] = brandToProduct[msg.sender]
            .length;

        brandToProduct[msg.sender].push(category);
    }

    function mint(string memory _productNo, string memory _serialNo)
        public
        ngExists(_productNo, _serialNo)
    {
        uint256 idx = getCategoryIndex(msg.sender, _productNo);
        Product[] memory categotys = getAddressToCategorys(msg.sender);
        NGInfo memory _ngInfo = NGInfo(_serialNo, categotys[idx]);

        ProductToNg[msg.sender][idx].push(_ngInfo);
        ngs.push(_ngInfo);
        blockNos.push(block.number);
        uint256 _id = ngs.length - 1;

        // mint는 계정권한에 1 또는 2로 등록되어있는 계정만 할 수 있음
        require(
            _accountsAuth[msg.sender] != 0,
            "NG : mint requests can only registered accounts for company"
        );

        _mint(msg.sender, _id);
        _mintedTokens[msg.sender].push(_id);
        addTokenHistory(_id);
        // _ngExists[_ngInfo] = true;
    }

    constructor(string memory named, string memory symbolified)
        ERC721Connector(named, symbolified)
    {}
}
