// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./extensions/ERC721Metadata.sol";
import "./extensions/ERC721Enumerable.sol";

contract ERC721Connector is ERC721Metadata, ERC721Enumerable {
    // 커넥터를 즉시 배포할 때, 메타데이터 정보 또한 전달되도록

    constructor(string memory name, string memory symbol)
        ERC721Metadata(name, symbol)
    {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, ERC165)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
