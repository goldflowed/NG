// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721Metadata.sol";
import "../../../utils/introspection/ERC165.sol";
import "../../../utils/Strings.sol";

contract ERC721Metadata is IERC721Metadata, ERC165 {
    using Strings for uint256;

    string private _name;
    string private _symbol;

    constructor(string memory named, string memory symbolified) {
        _name = named;
        _symbol = symbolified;
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId)
        external
        view
        virtual
        override
        returns (string memory)
    {
        string memory baseURI = "";
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }
}
