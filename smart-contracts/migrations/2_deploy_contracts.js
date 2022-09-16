const NG = artifacts.require("NG");

module.exports = function (deployer) {
  deployer.deploy(NG, "NftGuarantee", "NG");
}