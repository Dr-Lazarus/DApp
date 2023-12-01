const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const UserAcessControlContract = artifacts.require('contracts/UserAccessControl.sol');
module.exports = function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
  deployer.deploy(UserAcessControlContract);
};
