// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ProductVerifier {
    address public owner;

    struct Product {
        string brand;
        string model;
        string batch;
        string metadataURI; // IPFS hash
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Product) public products; // key = product ID

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function registerProduct(
        string memory _productID,
        string memory _brand,
        string memory _model,
        string memory _batch,
        string memory _metadataURI
    ) public onlyOwner {
        require(!products[_productID].exists, "Already registered");

        products[_productID] = Product({
            brand: _brand,
            model: _model,
            batch: _batch,
            metadataURI: _metadataURI,
            timestamp: block.timestamp,
            exists: true
        });
    }

    function verifyProduct(string memory _productID) public view returns (bool) {
        return products[_productID].exists;
    }

    function getProductDetails(string memory _productID)
        public
        view
        returns (
            string memory brand,
            string memory model,
            string memory batch,
            string memory metadataURI,
            uint256 timestamp
        )
    {
        require(products[_productID].exists, "Not registered");

        Product memory p = products[_productID];
        return (p.brand, p.model, p.batch, p.metadataURI, p.timestamp);
    }
}