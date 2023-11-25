const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const UserAcessControlContract = artifacts.require('UserAcessControl');
module.exports = function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
  // deployer.deploy(UserAcessControlContract);
};
