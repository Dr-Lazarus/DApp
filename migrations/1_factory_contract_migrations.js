const FundraiserFactoryContract = artifacts.require('FundraiserFactory');
const LogInContract = artifacts.require('UserAccessControl')

module.exports = function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
  deployer.deploy(LogInContract);

};
