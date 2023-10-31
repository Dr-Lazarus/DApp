const Donating = artifacts.require("../contracts/Donating.sol");

module.exports = function (deployer) {
  deployer.deploy(Donating);
};
